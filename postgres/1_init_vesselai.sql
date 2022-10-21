--
-- PostgreSQL database dump
--

DROP DATABASE IF EXISTS vesselai;

CREATE DATABASE vesselai
    WITH
    OWNER = postgres
    ENCODING = 'UTF8'
    TABLESPACE = pg_default
    CONNECTION LIMIT = -1;

\connect vesselai;

-- Dumped from database version 10.20 (Ubuntu 10.20-1.pgdg18.04+1)
-- Dumped by pg_dump version 14.2 (Ubuntu 14.2-1.pgdg18.04+1)

-- Started on 2022-04-20 11:38:04 WEST

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

--
-- TOC entry 197 (class 1259 OID 25742)
-- Name: ais_data_harmonized; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.ais_data_harmonized (
    id bigint NOT NULL,
    mmsi integer,
    status integer,
    speed integer,
    longitude double precision,
    latitude double precision,
    course integer,
    heading integer,
    datetime timestamp without time zone,
    ship_id integer,
    provider character varying(20)
);


--
-- TOC entry 196 (class 1259 OID 25740)
-- Name: ais_data_harmonized_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.ais_data_harmonized_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2928 (class 0 OID 0)
-- Dependencies: 196
-- Name: ais_data_harmonized_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.ais_data_harmonized_id_seq OWNED BY public.ais_data_harmonized.id;


--
-- TOC entry 199 (class 1259 OID 25750)
-- Name: weather_data_harmonized; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.weather_data_harmonized (
    id bigint NOT NULL,
    provider character varying(20),
    datetime timestamp without time zone,
    latitude double precision,
    longitude double precision,
    main_temp double precision,
    min_temp double precision,
    max_temp double precision,
    main_pressure double precision,
    humidity double precision,
    main_wind_speed double precision,
    main_wind_direction double precision,
    sea_level double precision,
    main_visibility double precision,
    main_wind_gust double precision,
    main_clouds double precision,
    country character varying(20),
    sunrise_time timestamp without time zone,
    sunset_time timestamp without time zone,
    main_precipitation double precision,
    max_precipitation double precision,
    min_precipitation double precision,
    probability_of_precipitation double precision,
    probability_of_thunder double precision
);


--
-- TOC entry 198 (class 1259 OID 25748)
-- Name: weather_data_harmonized_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.weather_data_harmonized_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- TOC entry 2929 (class 0 OID 0)
-- Dependencies: 198
-- Name: weather_data_harmonized_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.weather_data_harmonized_id_seq OWNED BY public.weather_data_harmonized.id;


--
-- TOC entry 2792 (class 2604 OID 25745)
-- Name: ais_data_harmonized id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ais_data_harmonized ALTER COLUMN id SET DEFAULT nextval('public.ais_data_harmonized_id_seq'::regclass);


--
-- TOC entry 2793 (class 2604 OID 25753)
-- Name: weather_data_harmonized id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.weather_data_harmonized ALTER COLUMN id SET DEFAULT nextval('public.weather_data_harmonized_id_seq'::regclass);


--
-- TOC entry 2795 (class 2606 OID 25747)
-- Name: ais_data_harmonized ais_data_harmonized_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.ais_data_harmonized
    ADD CONSTRAINT ais_data_harmonized_pkey PRIMARY KEY (id);


--
-- TOC entry 2797 (class 2606 OID 25755)
-- Name: weather_data_harmonized weather_data_harmonized_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.weather_data_harmonized
    ADD CONSTRAINT weather_data_harmonized_pkey PRIMARY KEY (id);


-- Completed on 2022-04-20 11:38:04 WEST

--
-- PostgreSQL database dump complete
--

