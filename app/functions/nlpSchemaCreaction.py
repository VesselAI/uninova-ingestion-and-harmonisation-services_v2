import pandas as pd
from collections import Counter
from math import sqrt
import json, math, re
import pathlib

WORD = re.compile(r"\w+")
path = pathlib.Path().resolve()
path = str(path)

def word2vec(word):
    # Count the number of characters in a word.
    count_characters = Counter(word)
    
    # Gets the set of characters and calculates the "lenght" of the vector.
    set_characters = set(count_characters)
    length = sqrt(sum(c*c for c in count_characters.values()))
    
    return count_characters, set_characters, length, word
    
def cosineSimilarityChar(vector1, vector2, ndigits):    
    # Get common characters between the two character sets.
    common_characters = vector1[1].intersection(vector2[1])
    
    # Sum of the product  of each intersection character.
    product_summation = sum(vector1[0][char] * vector2[0][char] for char in common_characters)
    
    # Get the lenght of each vector from the word2vec output.
    length = vector1[2] * vector2[2]
    
    # Calc cosine similarity and rounds the value to ndigits decimal place.
    if length == 0:
        # Set similarity value to 0 if word is empty.
        similarity = 0
    else:
        similarity = round(product_summation/length, ndigits)
    
    return similarity

def findSimilar(list1, harmonized_list, similarity_threshold, ndigits):
    # Initiate an empty list to store results
    results_list = []
    
    # Apply word2vec function to each name and store them in a list
    vector_list1 = [word2vec(str(i)) for i in list1]
    vector_list2 = [word2vec(str(i)) for i in harmonized_list]
    
    # Loops to compare each vector with another vector only once
    for i in range(len(vector_list1)):
        # Get first vector
        vector1 = vector_list1[i]
        
        for j in range(len(vector_list2)):
            vector2 = vector_list2[j]
            
            # Calculate cosine similarity
            similarity_score = cosineSimilarityChar(vector1, vector2, ndigits)
            
            # Append to results list if similarity score is between 1 and the threshold
            if 1 >= similarity_score >= similarity_threshold:
                results_list.append([vector1[3], vector2[3], similarity_score])
            else:
                pass
    
    # Convert list to dataframe
    results_df = pd.DataFrame(results_list)
    if len(results_df) != 0:
        results_df.columns = ['param', 'harmonized_param', 'score']
    else:
        pass
    
    return results_df

def cosineSimilarityWord(vec1, vec2, ndigits):
    intersection = set(vec1.keys()) & set(vec2.keys())
    numerator = sum([vec1[x] * vec2[x] for x in intersection])

    sum1 = sum([vec1[x] ** 2 for x in vec1.keys()])
    sum2 = sum([vec2[x] ** 2 for x in vec2.keys()])
    denominator = math.sqrt(sum1) * math.sqrt(sum2)

    if not denominator:
        return 0.0
    else:
        return round(float(numerator) / denominator, ndigits)

def text2Vector(text):
    words = WORD.findall(text)
    return Counter(words), text

def findSimilarWord(columns, harmonized_list, list1, harmonized_list_clean, similarity_threshold, ndigits):
    # Initiate an empty list to store results
    results_list = []
    
    # Apply word2vec function to each name and store them in a list
    vector_list1 = [text2Vector(str(i)) for i in list1]
    vector_list2 = [text2Vector(str(i)) for i in harmonized_list_clean]

    # Loops to compare each vector with another vector only once
    for i in range(len(vector_list1)):
        # Get first vector
        vector1 = vector_list1[i]

        highest_similarity = 0
        harmonized_entry = ''
        similarity_score = 0
        
        for j in range(len(vector_list2)):
            vector2 = vector_list2[j]
            
            # Calculate cosine similarity
            similarity_score = cosineSimilarityWord(vector1[0], vector2[0], ndigits)

            if similarity_score > highest_similarity:
                highest_similarity = similarity_score
                harmonized_entry = harmonized_list[j]

            
        # Append to results list if similarity score is between 1 and the threshold
        if 1 >= highest_similarity >= similarity_threshold:
            results_list.append([columns[i], harmonized_entry])
        else:
            # pass
            results_list.append([columns[i], ''])
    
    # Convert list to dataframe
    # results_df = pd.DataFrame(results_list)
    # if len(results_df) != 0:
    #     results_df.columns = ['param', 'harmonized_param', 'score']
    # else:
    #     pass
    
    return results_list

def nlpSchemaCreation(spark, type, data_type, params):

    if 'delimiter' in params:
        delimiter = params['delimiter']
    if 'file_path' in params:
        file_path = params['file_path']
    if 'file_type' in params:
        file_type = params['file_type']
    if type == 'File':
        if file_type == 'csv':
            df = spark.read.options(delimiter=delimiter, header=True).csv(file_path)
        elif file_type == 'excel':
            df_pandas = pd.read_excel(file_path, header=True)
            df = spark.createDataFrame(df_pandas)

    columns = df.columns
    print(columns)

    # Pre-process raw schema word list
    list1 = [(str(i).lower()) for i in columns]
    list1 = [(str(i).replace('_', ' ')) for i in list1]

    f = open(path + '/schemas/' + str(data_type).lower() + '_harmonization_schema.json')
    harmonized_schema = json.load(f)

    harmonized_list = []
    for key in harmonized_schema.keys():
        harmonized_list.append(key)

    # Pre-process harmonized schema word list
    harmonized_list_clean = [(str(i).lower()) for i in harmonized_list]
    harmonized_list_clean = [(str(i).replace('_', ' ')) for i in harmonized_list_clean]


    ndigits  = 3
    similarity_threshold = 0.51

    results_list = findSimilarWord(columns, harmonized_list, list1, harmonized_list_clean, similarity_threshold, ndigits)

    print(results_list)

    return results_list