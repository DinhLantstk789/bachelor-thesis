--
-- PostgreSQL database dump
--

-- Dumped from database version 13.2
-- Dumped by pg_dump version 13.2

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

--
-- Name: related_url; Type: TYPE; Schema: public; Owner: suongsun
--

CREATE TYPE public.related_url AS (
	url text,
	url_type text
);


ALTER TYPE public.related_url OWNER TO suongsun;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: divisions; Type: TABLE; Schema: public; Owner: suongsun
--

CREATE TABLE public.divisions (
    name text NOT NULL,
    db_created_on timestamp without time zone DEFAULT now(),
    db_updated_on timestamp without time zone DEFAULT now()
);


ALTER TABLE public.divisions OWNER TO suongsun;

--
-- Name: publication; Type: TABLE; Schema: public; Owner: suongsun
--

CREATE TABLE public.publication (
    id integer NOT NULL,
    item_type text,
    title text NOT NULL,
    abstract text,
    corporate_creators text[],
    is_refereed boolean,
    status character varying(20),
    kind character varying(20),
    publication_title text,
    institution text,
    publication_department text,
    presentation_type text,
    monograph_type text,
    thesis_type text,
    issn_isbn text,
    publisher text,
    official_url text,
    volume integer,
    place_of_publication text,
    number_of_pages integer,
    patent_applicant text,
    media_output text,
    copyright_holder text,
    number integer,
    page_range integer[],
    date date,
    date_type text,
    identification_number text,
    series_name text,
    related_urls public.related_url[],
    funders text[],
    projects text[],
    contact_email_address text,
    reference text,
    uncontrolled_keywords text,
    additional_infor text,
    comments_and_suggestions text,
    subjects text[],
    is_approved boolean DEFAULT false,
    db_created_on timestamp without time zone DEFAULT now(),
    db_updated_on timestamp without time zone DEFAULT now(),
    ranking character varying
);


ALTER TABLE public.publication OWNER TO suongsun;

--
-- Name: publication_creator; Type: TABLE; Schema: public; Owner: suongsun
--

CREATE TABLE public.publication_creator (
    publication_id integer NOT NULL,
    creator_email text NOT NULL,
    author_order integer,
    db_created_on timestamp without time zone DEFAULT now(),
    db_updated_on timestamp without time zone DEFAULT now()
);


ALTER TABLE public.publication_creator OWNER TO suongsun;

--
-- Name: publication_division; Type: TABLE; Schema: public; Owner: suongsun
--

CREATE TABLE public.publication_division (
    publication_id integer NOT NULL,
    division_name text NOT NULL,
    db_created_on timestamp without time zone DEFAULT now(),
    db_updated_on timestamp without time zone DEFAULT now()
);


ALTER TABLE public.publication_division OWNER TO suongsun;

--
-- Name: publication_editor; Type: TABLE; Schema: public; Owner: suongsun
--

CREATE TABLE public.publication_editor (
    publication_id integer NOT NULL,
    editor_email text NOT NULL,
    db_created_on timestamp without time zone DEFAULT now(),
    db_updated_on timestamp without time zone DEFAULT now()
);


ALTER TABLE public.publication_editor OWNER TO suongsun;

--
-- Name: publication_id_seq; Type: SEQUENCE; Schema: public; Owner: suongsun
--

CREATE SEQUENCE public.publication_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.publication_id_seq OWNER TO suongsun;

--
-- Name: publication_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: suongsun
--

ALTER SEQUENCE public.publication_id_seq OWNED BY public.publication.id;


--
-- Name: user_division; Type: TABLE; Schema: public; Owner: suongsun
--

CREATE TABLE public.user_division (
    user_email text NOT NULL,
    division_name text NOT NULL,
    db_created_on timestamp without time zone DEFAULT now(),
    db_updated_on timestamp without time zone DEFAULT now()
);


ALTER TABLE public.user_division OWNER TO suongsun;

--
-- Name: users; Type: TABLE; Schema: public; Owner: suongsun
--

CREATE TABLE public.users (
    email text NOT NULL,
    family_name text,
    given_name text,
    hide_email boolean DEFAULT true NOT NULL,
    password text,
    address text,
    is_admin boolean DEFAULT false,
    description text,
    registration_date timestamp without time zone,
    last_login timestamp without time zone,
    is_approved boolean DEFAULT false,
    db_created_on timestamp without time zone DEFAULT now(),
    db_updated_on timestamp without time zone DEFAULT now(),
    academic_title text DEFAULT 'None'::text,
    manager_title text DEFAULT 'None'::text,
    union_title text DEFAULT 'None'::text
);


ALTER TABLE public.users OWNER TO suongsun;

--
-- Name: publication id; Type: DEFAULT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.publication ALTER COLUMN id SET DEFAULT nextval('public.publication_id_seq'::regclass);


--
-- Data for Name: divisions; Type: TABLE DATA; Schema: public; Owner: suongsun
--

COPY public.divisions (name, db_created_on, db_updated_on) FROM stdin;
Advanced Institute of Engineering and Technology (AVITECH)	2021-04-21 14:02:10.757739	2021-04-21 14:02:10.757739
Department of Civil Engineering and Transportation (CET)	2021-04-21 14:02:10.76178	2021-04-21 14:02:10.76178
Center for Electronics and Telecommunications Research (CETR)	2021-04-21 14:02:10.763239	2021-04-21 14:02:10.763239
Faculty of Agriculture Technology (FAT)	2021-04-21 14:02:10.764649	2021-04-21 14:02:10.764649
Faculty of Electronics and Telecommunications (FET)	2021-04-21 14:02:10.766553	2021-04-21 14:02:10.766553
Faculty of Engineering Mechanics and Automation (FEMA)	2021-04-21 14:02:10.768247	2021-04-21 14:02:10.768247
Faculty of Engineering Physics and Nanotechnology (FEPN)	2021-04-21 14:02:10.769497	2021-04-21 14:02:10.769497
Faculty of Information Technology (FIT)	2021-04-21 14:02:10.77044	2021-04-21 14:02:10.77044
Key Laboratory for Nanotechnology (Nano Lab)	2021-04-21 14:02:10.772186	2021-04-21 14:02:10.772186
School of Aerospace Engineering (SAE)	2021-04-21 14:02:10.773182	2021-04-21 14:02:10.773182
Key Laboratory for Smart Integrated Systems (SISLAB)	2021-04-21 14:02:11.757649	2021-04-21 14:02:11.757649
Japan Advanced Institute of Science and Technology (JAIST)	2021-04-21 13:17:45.463707	2021-04-21 13:17:45.463707
	2021-04-21 17:15:22.843139	2021-04-21 17:15:22.843139
Yonsei University	2021-04-21 17:24:01.586878	2021-04-21 17:24:01.586878
Korea Advanced Institute of Science and Technology	2021-04-21 17:24:01.586448	2021-04-21 17:24:01.586448
National University of Singapore	2021-04-21 17:24:01.588114	2021-04-21 17:24:01.588114
Korea University	2021-04-21 17:24:01.587758	2021-04-21 17:24:01.587758
University of Cambridge	2021-04-21 17:24:01.587981	2021-04-21 17:24:01.587981
Japan Advanced Institute of Science and Technology	2021-04-21 17:27:36.616736	2021-04-21 17:27:36.616736
Tohoku University	2021-04-23 01:24:04.880474	2021-04-23 01:24:04.880474
\.


--
-- Data for Name: publication; Type: TABLE DATA; Schema: public; Owner: suongsun
--

COPY public.publication (id, item_type, title, abstract, corporate_creators, is_refereed, status, kind, publication_title, institution, publication_department, presentation_type, monograph_type, thesis_type, issn_isbn, publisher, official_url, volume, place_of_publication, number_of_pages, patent_applicant, media_output, copyright_holder, number, page_range, date, date_type, identification_number, series_name, related_urls, funders, projects, contact_email_address, reference, uncontrolled_keywords, additional_infor, comments_and_suggestions, subjects, is_approved, db_created_on, db_updated_on, ranking) FROM stdin;
3	conference-workshop-item	A method for automated test data generation from sequence diagrams and object constraint language	This paper proposes an automated test data generation method from the information embedded in model elements such as Unified Modeling Language (UML) sequence diagrams, class diagrams, and Object Constraint Language (OCL). The method supports UML 2.0 sequence diagrams including eight kinds of combined fragments describing control flow of systems. Comparing with some approaches by using depth first search (DFS) or breadth first search (BFS) algorithms, the proposed method generates all possible test scenarios with the higher error uncover capability. Test data for testing loop fragment is also generated. Therefore, it helps to detect errors in testing loops and the concurrency errors such as safety and liveness property of the systems.	{""}	f	published	international				paper					https://dl.acm.org/doi/pdf/10.1145/2833258.2833294	0		0				0	{0,0}	2015-12-03	publication	10.1145/2833258.2833294		{}	{""}	{""}						{"Electronics and Computer Engineering","Information Technology (IT)","Scopus-indexed journals"}	t	2021-04-21 13:42:51.372226	2021-04-21 13:42:51.372226	\N
1	article	Modular conformance testing and assume-guarantee verification for evolving component-based software	This paper proposes a framework for modular verification of evolving component-based software. This framework includes two stages: modular conformance testing for updating inaccurate models of the evolved components and modular verification for evolving component-based software. When a component is evolved after adapting some refinements, the proposed framework focuses on this component and its model in order to update the model and recheck the whole evolved system. The framework also reuses the previous verification results and the previous models of the evolved components to reduce the number of steps required in the model update and modular verification processes. An implementation and some experimental results are presented.	{""}	f	published	international	IEICE Transactions on Fundamentals of Electronics, Communications and Computer Sciences						1745-1337	The Institute of Electronics, Information and Communication Engineers	https://ieeexplore.ieee.org/document/4724581	92		0				11	{2772,2780}	2009-11-01	publication	10.1587/transfun.E92.A.2772		{}	{" JAIST 21 Century COE"}	{"Verifiable and Evolvable e-Society"}						{"Electronics and Computer Engineering","ISI-indexed journals","Information Technology (IT)","Scopus-indexed journals"}	t	2021-04-21 13:17:45.435283	2021-04-21 13:17:45.435283	\N
2	conference-workshop-item	A minimized assumption generation method for component-based software verification	An assume-guarantee verification method has been recognized as a promising approach to verify component-based software with model checking. The method is not only fitted to component-based software but also has a potential to solve the state space explosion problem in model checking. This method allows us to decompose a verification target into components so that we can model check each of them separately. In this method, assumptions which are environments of the components are generated. The number of states of the assumptions should be minimized because the computational cost of model checking is influenced by that number. Thus, we propose a method for generating minimal assumptions for the assume-guarantee verification of component-based software. The key idea of this method is finding the minimal assumptions in the search spaces of the candidate assumptions. These assumptions are seen as the environments needed for the components to satisfy a property and for the rest of the system to be satisfied. The minimal assumptions generated by the proposed method can be used to recheck the whole system at much lower computational cost. We have implemented a tool for generating the minimal assumptions. Experimental results are also presented and discussed.	{""}	f	published	international				paper					https://link.springer.com/chapter/10.1007/978-3-642-03466-4_18	0		0				0	{0,0}	2009-08-16	publication	10.1007/978-3-642-03466-4_18		{}	{""}	{""}						{"Electronics and Computer Engineering","ISI-indexed journals","Information Technology (IT)"}	f	2021-04-21 13:38:34.361366	2021-04-21 13:38:34.361366	\N
4	conference-workshop-item	An assume-guarantee model checker for component-based systems	This paper introduces an assume-guarantee model checker, named AGMC, for verifying correctness of designs of component-based systems. Given UML 2.0 sequence diagrams that describe behaviors of the system components and a required property, AGMC generates accurate models of the components represented by labeled transition systems (LTSs) automatically. AGMC then model checks that whether the system satisfies the property by using the assume-guarantee verification method. AGMC has been implemented and tested by applying some typical component-based systems. The implemented AGMC is not only useful to verify component-based systems in practice but also has a potential to solve the state space explosion problem in model checking.	{""}	f	published	international				paper					https://ieeexplore.ieee.org/abstract/document/6719860/	0		0				0	{0,0}	2013-11-10	publication	10.1109/RIVF.2013.6719860		{}	{"Vietnam National University, Hanoi (VNU)"}	{QG.12.50}						{Communications,"Electronics and Computer Engineering","ISI-indexed journals","Information Technology (IT)"}	f	2021-04-21 17:15:22.781154	2021-04-21 17:15:22.781154	\N
6	conference-workshop-item	Formal Semantics Extraction from Natural Language Specifications for ARM	This paper proposes a method to systematically extract the formal semantics of ARM instructions from their natural language specifications. Although ARM is based on RISC architecture and the number of instructions is relatively small, an abundance of variations diversely exist under various series including Cortex-A, Cortex-M, and Cortex-R. Thus, the semi-automatic semantics formalisation of rather simple instructions results in reducing tedious human efforts for tool developments e.g., the symbolic execution. We concentrate on six variations: M0, M0+, M3, M4, M7, and M33 of ARM Cortex-M series, aiming at covering IoT malware. Our systematic approach consists of the semantics interpretation by applying translation rules, augmented by the sentences similarity analysis to recognise the modification of flags. Among 1039 collected specifications, the formal semantics of 662 instructions have been successfully extracted by using only 228 manually prepared rules. They are utilised afterwards to preliminarily build a dynamic symbolic execution tool for Cortex-M called Corana. We experimentally observe that Corana is capable of effectively tracing IoT malware under the presence of obfuscation techniques like indirect jumps, as well as correctly detecting dead conditional branches, which are regarded as opaque predicates.	{""}	f	published	international				paper					https://link.springer.com/chapter/10.1007/978-3-030-30942-8_28	0		0				0	{0,0}	2019-10-07	publication	10.1007/978-3-030-30942-8_28		{}	{""}	{""}						{Communications,"Electronics and Computer Engineering","ISI-indexed journals","Information Technology (IT)","Scopus-indexed journals"}	f	2021-04-21 17:27:36.582958	2021-04-21 17:27:36.582958	\N
7	article	Turning Up the Dial: The Evolution of a Cybercrime Market Through Set-up, Stable, and Covid-19 Eras	Trust and reputation play a core role in underground cybercrime markets, where participants are anonymous and there is little legal recourse for dispute arbitration. These underground markets exist in tension between two opposing forces: the drive to hide incriminating information, and the trust and stability benefits that greater openness yields. Revealing information about transactions to mitigate scams also provides valuable data about the market. We analyse the first dataset, of which we are aware, about the transactions created and completed on a well-known and high-traffic underground marketplace, Hack Forums, along with the associated threads and posts made by its users over two recent years, from June 2018 to June 2020. We use statistical modelling approaches to analyse the economic and social characteristics of the market over three eras, especially its performance as an infrastructure for trust. In the Set-up era, we observe the growth of users making only one transaction, as well as 'power-users' who make many transactions. In the Stable era, we observe a wide range of activities (including large-scale transfers of intermediate currencies such as Amazon Giftcards) which declines slowly from an initial peak. Finally, we analyse the effects of the Covid-19 pandemic, concluding that while we see a significant increase in transactions across all categories, this reflects a stimulus of the market, rather than a transformation. New users overcome the 'cold start' problem by engaging in low-level currency exchanges to prove their trustworthiness. We observe currency exchange accounts for most contracts, and Bitcoin and PayPal are the preferred payment methods by trading values and number of contracts involved. The market is becoming more centralised over time around influential users and threads, with significant changes observed during the Set-up and Covid-19 eras.	{""}	f	published	international	Internet Measurement Conference (IMC'20)							Association for Computing Machinery	https://dl.acm.org/doi/abs/10.1145/3419394.3423636	13		0				32	{123,140}	2020-10-27	publication	10.1145/3419394.3423636		{}	{"Engineering and Physical Sciences Research Council (EPSRC)"}	{"EP/M020320/1 and EP/V026178/1"}						{Communications,"Engineering Mechanics","ISI-indexed journals","Information Technology (IT)","Scopus-indexed journals"}	t	2021-04-21 17:36:37.148343	2021-04-21 17:36:37.148343	\N
5	conference-workshop-item	A Stealthier Partitioning Attack against Bitcoin Peer-to-Peer Network	Network adversaries, such as malicious transit autonomous systems (ASes), have been shown to be capable of partitioning the Bitcoin’s peer-to-peer network via routing-level attacks; e.g., a network adversary exploits a BGP vulnerability and performs a prefix hijacking attack (viz. Apostolaki et al. [3]). Due to the nature of BGP operation, such a hijacking is globally observable and thus enables immediate detection of the attack and the identification of the perpetrator. In this paper, we present a stealthier attack, which we call the Erebus attack, that partitions the Bitcoin network without any routing manipulations, which makes the attack undetectable to control-plane and even to data-plane detectors. The novel aspect of Erebus is that it makes the adversary AS a natural man-in-the-middle network of all the peer connections of one or more targeted Bitcoin nodes by patiently influencing the targeted nodes’ peering decision. We show that affecting the peering decision of a Bitcoin node, which is believed to be infeasible after a series of bug patches against the earlier Eclipse attack [29], is possible for the network adversary that can use abundant network address resources (e.g., spoofing millions of IP addresses in many other ASes) reliably for an extended period of time at a negligible cost. The Erebus attack is readily available for large ASes, such as Tier-1 and large Tier-2 ASes, against the vast majority of 10K public Bitcoin nodes with only about 520 bit/s of attack traffic rate per targeted Bitcoin node and a modest (e.g., 5–6 weeks) attack execution period. The Erebus attack can be mounted by nation-state adversaries who would be willing to execute sophisticated attack strategies patiently to compromise cryptocurrencies (e.g., control the consensus, take down a cryptocurrency, censor transactions). As the attack exploits the topological advantage of being a network adversary but not the specific vulnerabilities of Bitcoin core, no quick patches seem to be available. We discuss that some naive solutions (e.g., whitelisting, rate-limiting) are ineffective and third-party proxy solutions may worsen the Bitcoin’s centralization problem. We provide some suggested modifications to the Bitcoin core and show that they effectively make the Erebus attack significantly harder; yet, their non-trivial changes to the Bitcoin’s network operation (e.g., peering dynamics, propagation delays) should be examined thoroughly before their wide deployment.	{""}	f	published	international				paper					https://ieeexplore.ieee.org/abstract/document/9152616/	0		0				0	{0,0}	2020-05-18	publication	10.1109/SP40000.2020.00027		{}	{"National University of Singapore."}	{"CRYSTAL Centre"}						{Communications,"Electronics and Computer Engineering","ISI-indexed journals","Information Technology (IT)","Scopus-indexed journals"}	t	2021-04-21 17:24:01.555111	2021-04-21 17:24:01.555111	\N
8	technical-report	The Pandemic as Incels see it	CCC COVID Briefing Papers are an ongoing series of short-form, open access reports aimed at academics, policymakers, and practitioners, which aim to provide an accessible summary of our ongoing research into the effects which the coronavirus pandemic (and government responses) are having on cybercrime. In this report, we examine the effects of the pandemic lockdown on the online discourse of people defining themselves as incels by analysing their chat on incels. co and incels. net, the two most active English-language forums dedicated to this online subculture. We have collected more than five million posts on these forums as part of our ExtremeBB dataset, and we present a preliminary snapshot. We observe a substantial increase in the number of posts and threads during lockdown; however, the number of members making these posts dropped slightly. We also find a substantial intensification of hostile and violent discourse in these forums, particularly in discussions of the potential for (as they see it) favourable changes to society and their place in it due to the pandemic.	{""}	f	published	international		University of Cambridge	Computer Science and Technology		technical-reportMonoType			Cambridge Cybercrime Centre Briefing Paper Series	https://www.cl.cam.ac.uk/~vv301/papers/covid-briefing-incel-activities.pdf	0	Cambridge, United Kingdom	2				0	{0,0}	2020-08-04	publication	10.13140/RG.2.2.27697.61288		{}	{""}	{""}						{"Electronics and Computer Engineering","ISI-indexed journals","Information Technology (IT)","Civil Engineering"}	t	2021-04-21 17:42:29.041006	2021-04-21 17:42:29.041006	\N
9	article	On optimization of minimized assumption generation method for component-based software verification	The minimized assumption generation has been recognized as an important improvement of the assume-guarantee verification method in order to generate minimal assumptions. The generated minimal assumptions can be used to recheck the whole component-based software at a lower computational cost. The method is not only fitted to component-based software but also has a potential to solve the state space explosion problem in model checking. However, the computational cost for generating the minimal assumption is very high so the method is difficult to be applied in practice. This paper presents an optimization as a continuous work of the minimized assumption generation method in order to reduce the complexity of the method. The key idea of this method is to find a smaller assumption in a sub-tree of the search tree containing the candidate assumptions using the depth-limited search strategy. With this approach, the improved method can generate assumptions with a lower computational cost and consumption memory than the minimized method. The generated assumptions are also effective for rechecking the systems at much lower computational cost in the context of software evolution. An implemented tool supporting the improved method and experimental results are also presented and discussed.\n\n	{""}	f	published	international	IEICE Transactions on Fundamentals of Electronics, Communications and Computer Sciences						1745-1337	The Institute of Electronics, Information and Communication Engineers	https://ieeexplore.ieee.org/document/6169862/	95		0				9	{1451,1460}	2012-09-01		10.1587/transfun.E95.A.1451		{}	{""}	{""}						{Communications,"Electronics and Computer Engineering","ISI-indexed journals","Information Technology (IT)","Scopus-indexed journals"}	f	2021-04-21 17:50:53.307054	2021-04-21 17:50:53.307054	\N
10	article	An assume-guarantee method for modular verification of evolving component-based software	An Assume-Guarantee Method for Modular Verification of Evolving Component-Based Software An Assume-Guarantee Method for Modular Verification of Evolving Component-Based Software Pham Ngoc Hung, Nguyen Truong Thang, and Takuya Katayama Japan Advanced Institute of Science and Technology – JAIST {hungpn, thang, katayama}@jaist.ac.jp Page 2. 2 DSN 2007 – WADS, Edinburgh, UK June 27, 2007 Contents Introduction Background A Framework for Modular Verification of Evolving CBS Assumption Regeneration Method Related Work & Conclusion Page 3. 3 DSN 2007 – WADS, Edinburgh, UK June 27, 2007 Component-Based Software (CBS) Structured from a set of well-defined components ➢ Ideally, components are plug-and-play ➢ Advantages: low development cost and time, flexible for changes, etc. One of key issues of CBS is "component consistency"	{""}	f	published	international	6th WADS in conjunction with the 37th Annual IEEE/IFIP Intenational Conference on Dependable Systems and Networks (DSN)									0		0				0	{160,165}	2007-06-14	publication			{}	{""}	{""}						{"Engineering Mechanics","ISI-indexed journals","Information Technology (IT)","Scopus-indexed journals"}	t	2021-04-21 17:56:32.724028	2021-04-21 17:56:32.724028	\N
18	conference-workshop-item	A method for automated unit testing of C programs	This research proposes an automated test case generation method for C functions. In this method, the source code is transformed into a control flow graph corresponding to the given coverage criterion. After that, a list of feasible test paths are discovered by traversing the control flow graph using backtracking algorithm, symbolic execution, and Z3 solver. We also generate test cases for functions containing one loop or two-nested loop. A tool supporting the proposed method has been developed and applied to test on some C functions. The experimental results show the high coverage with the minimum number of test cases, the ability to improve the total time of the test case generation with a specified coverage criterion, and the increasing precision of checking the feasibility of test paths if comparing with the random technique. The experimental results display the potential usefulness of this tool for automated test case generation in practice.	{""}	f	published	domestic				paper					https://eprints.uet.vnu.edu.vn/eprints/id/eprint/2002/1/bare_conf.pdf	0		0				0	{0,0}	2016-09-14	publication			{}	{"Vietnam National University, Hanoi (VNU)"}	{QG.16.31}						{Communications,"Electronics and Computer Engineering","Engineering Physics","Information Technology (IT)"}	f	2021-04-22 09:22:45.005556	2021-04-22 09:22:45.005556	\N
19	article	A Method for Generating Models of Black-box Components	The model-based approaches are difficult to be applied in practice due to the lack of formal models describing behaviors of systems. This paper proposes a method for generating accurate models of components in order to solve this issue in the context of the component-based systems. The key idea of this method is to generate minimal deterministic finite automata as the accurate models of the corresponding components. For this purpose, the proposed method first computes a set of traces as a regular language of a given component by executing all possible experiments over the alphabet of the component. This method then constructs a regular expression to represent this set. After that, a minimal deterministic finite automaton as an accurate model of the component is generated by applying the Thompson algorithm and some optimized activities. The generated models are useful for the existing model-based approaches, e.g., model checking and model-based testing in improving quality of component-based software. An implemented tool supporting the method and experimental results are also presented.	{""}	f	published	international	2012 Fourth International Conference on Knowledge and Systems Engineering			paper				IEEE	https://ieeexplore.ieee.org/abstract/document/6299422/	0		0				0	{217,222}	2012-08-17	publication	10.1109/KSE.2012.15		{}	{""}	{""}						{"Aerospace Engineering","Engineering Mechanics","Information Technology (IT)","Transportation Technology"}	t	2021-04-22 09:26:30.243074	2021-04-22 09:26:30.243074	\N
20	thesis	Healthkee: a symptom checker and personalized health information service	With improvements in technology and access to the internet, people are increasingly using the Internet to research their health concerns. According to Pew Research Center’s Internet & American Life Project, more than 35% of adults in the United States regularly use the Internet to self diagnose their ailments, using it both for non-urgent symptoms and for urgent symptoms. There are many systems in English can support self-diagnosis as well as provide medical information such as WebMD, Mayo Clinic, NHS Choice, etc. However, there are not many same systems in Vietnam that can provide reliable and easy to understand clinical information. Healthkee aims to become a smart health assistant for Vietnamese that provide personalized health information, which is accurate, fast and easy to understand anywhere, anytime.	{""}	f	published	domestic		University of Engineering and Technology	Information Technology			diploma				0		30				0	{0,0}	2016-04-23	publication			{}	{""}	{""}						{"Aerospace Engineering","Engineering Mechanics","Information Technology (IT)","Transportation Technology"}	f	2021-04-22 22:58:16.510843	2021-04-22 22:58:16.510843	\N
21	article	On Locally Strongest Assumption Generation Method for Component-Based Software Verification	Assume-guarantee reasoning, a well-known approach in component-based software (CBS) verification, is in fact a language containment problem whose computational cost depends on the sizes of languages of the software components under checking and the assumption to be generated. Therefore, the smaller language assumptions, the more computational cost we can reduce in software verification. Moreover, strong assumptions are more important in CBS verification in the context of software evolution because they can be reused many times in the verification process. For this reason, this paper presents a method for generating locally strongest assumptions with locally smallest languages during CBS verification. The key idea of this method is to create a variant technique for answering membership queries of the Teacher when responding to the Learner in the L ∗–based assumption learning process. This variant technique is then integrated into an algorithm in order to generate locally strongest assumptions. These assumptions will effectively reduce the computational cost when verifying CBS, especially for large–scale and evolving ones. The correctness proof, experimental results, and some discussions about the proposed method are also presented.	{""}	f	published	domestic	Computer Science and Communication Engineering							VNU Journal of Science	https://doi.org/10.25073/2588-1086/vnucsce.209	34		0				2	{0,0}	2018-12-25		https://doi.org/10.25073/2588-1086/vnucsce.209		{}	{"Vietnam National Foundation for Science and Technology Development (NAFOSTED)"}	{102.03-2015.25}						{"Electronics and Computer Engineering","Information Technology (IT)","Civil Engineering"}	f	2021-04-23 00:55:39.247312	2021-04-23 00:55:39.247312	\N
22	book-section	A test data generation method for C/C++ projects	This research proposes an automated test data generation method for C/C++ projects to generate the lower number of test data while gaining higher code coverage in comparison with KLEE, CAUT, PathCrawler, and CREST. In order to do that, the proposed method contributes an algorithm named loop depth first search by combining both static testing and concolic testing together. Besides, the paper also provides an improvement symbolic execution for avoiding the initial test data problem in the concolic testing. Currently, a tool supporting the proposed method has been developed and applied to test on different C/C++ projects in several software companies. The experimental results show the higher coverage with the lower number of test data compared with the existing methods. The experimental results display the effectiveness and practical usefulness of the proposed method for automated test data generation in practice.	{""}	f	published	international	Proceedings of the Eighth International Symposium on Information and Communication Technology								https://dl.acm.org/doi/abs/10.1145/3155133.3155144	0		0				0	{431,438}	2017-12-07	publication	10.1145/3155133.3155144		{}	{""}	{""}						{Communications,"Engineering Physics","Information Technology (IT)","Scopus-indexed journals"}	t	2021-04-23 00:58:36.23289	2021-04-23 00:58:36.23289	\N
23	conference-workshop-item	Learning to classify short and sparse text & web with hidden topics from large-scale data collections	This paper presents a general framework for building classifiers that deal with short and sparse text & Web segments by making the most of hidden topics discovered from largescale data collections. The main motivation of this work is that many classification tasks working with short segments of text & Web, such as search snippets, forum & chat messages, blog & news feeds, product reviews, and book & movie summaries, fail to achieve high accuracy due to the data sparseness. We, therefore, come up with an idea of gaining external knowledge to make the data more related as well as expand the coverage of classifiers to handle future data better. The underlying idea of the framework is that for each classification task, we collect a large-scale external data collection called “universal dataset”, and then build a classifier on both a (small) set of labeled training data and a rich set of hidden topics discovered from that data collection. The framework is general enough to be applied to different data domains and genres ranging from Web search results to medical text. We did a careful evaluation on several hundred megabytes of Wikipedia (30M words) and MEDLINE (18M words) with two tasks: “Web search domain disambiguation” and “disease categorization for medical text”, and achieved significant quality enhancement.	{""}	f	published	international				paper					https://dl.acm.org/doi/pdf/10.1145/1367497.1367510	0		0				0	{0,0}	2008-04-25	publication	10.1145/1367497.1367510		{}	{"Japan Society for the Promotion of Science (JSPS)."}	{No.P06366}						{Communications,"ISI-indexed journals","Information Technology (IT)","Scopus-indexed journals"}	f	2021-04-23 01:24:04.852332	2021-04-23 01:24:04.852332	\N
24	book-section	A feature-word-topic model for image annotation	Image annotation is to automatically associate semantic labels with images in order to obtain a more convenient way for indexing and searching images on the Web. This paper proposes a novel method for image annotation based on feature-word and word-topic distributions. The introduction of topics enables us to efficiently take word associations, such as {ocean, fish, coral}, into image annotation. Feature-word distributions are utilized to define weights in computation of topic distributions for annotation. By doing so, topic models in text mining can be applied directly in our method. Experiments show that our method is able to obtain promising improvements over the state-of-the-art method-Supervised Multiclass Labeling (SML)	{""}	f	published	international	Proceedings of the 19th ACM international conference on Information and knowledge management							ACM	https://dl.acm.org/doi/pdf/10.1145/1871437.1871652	10	Toronto, Ontario, Canada	0				30	{1481,1484}	2010-10-26		10.1145/1871437.1871652		{}	{""}	{""}						{Communications,"Engineering Physics","Information Technology (IT)","Transportation Technology"}	f	2021-04-23 01:29:27.224735	2021-04-23 01:29:27.224735	\N
25	article	Constructing a Bayesian belief network to generate learning path in adaptive hypermedia system	There are many methods and techniques which have been promoted to develop adaptive hypermedia systems [1]. Our model approach [2], generating adaptive courses based on learner’s profile which learner’s includes background, skills, style... etc. One of important steps in our model is to generate learning path adaptive for each learner. In this paper, we promote an algorithm based on shortest path search algorithm to evaluate learning object (LO) based on its attributes [3] and constructed a Bayesian Belief Network (BBN) to generate learning path for each learner.	{""}	f	published	international	Journal of Computer Science and Cybernetics							Vietnam National University		24		0				1	{12,19}	2008-12-11	publication			{}	{""}	{""}						{Communications,"Information Technology (IT)","Civil Engineering"}	t	2021-04-23 01:35:15.828248	2021-04-23 01:35:15.828248	\N
26	article	Đặc tả và kiểm chứng tính bất biến của các hệ đa tác tử	Chứng minh tính đúng đắn của các hệ thống nói chung và các hệ đa tác tử nói riêng đang nhận được sự quan tâm nghiên cứu rộng rãi. Bài toán này sẽ khó khăn hơn khi các hệ đa tác tử có không gian trạng thái là vô hạn. Bài báo này đề xuất một phương pháp đặc tả và kiểm chứng các thuộc tính bất biến của các hệ đa tác tử đối với không gian trạng thái là vô hạn. Trong phương pháp này, hành vi của hệ thống cũng với các thuộc tính cần chứng minh được đặc tả bằng ngôn ngữ đại số. Không gian vô hạn các trạng thái của hệ thống được xác định đệ quy bằng cách chỉ ra trạng thái khởi tạo và cách chuyển đến các trạng thái tiếp theo từ một trạng thái bất kỳ của hệ thống. Chúng tôi sử dụng phương pháp quy nạp toán học để chứng minh tính thỏa mãn của các thuộc tính trên toàn bộ không gian trạng thái của hệ thống. Một ví dụ minh họa cho cũng được trình bày và thảo luận trong bài báo này nhằm minh chứng cho tính hiệu quả của phương pháp đề xuất.	{""}	f	published	domestic	Natural Sciences and Technology							VNU Journal of Science		27		0				4	{0,0}	2011-12-15	publication			{}	{""}	{""}	hungpham@gmail.com	Pham Ngoc Hung, UET, VNU	Software Engineering, Component-Based	There is no additional information needed	There is no comments	{"Electronics and Computer Engineering","Information Technology (IT)","Civil Engineering"}	f	2021-04-25 06:17:02.890062	2021-04-25 06:17:02.890062	\N
27	book	Giáo trình kiểm thử phần mềm	Giáo trình kiểm thử phần mềm	{""}	f	published	domestic								Nhà xuất bản ĐH Quốc Gia HN		0	Đại học Quốc Gia Hà Nội 	0				0	{0,0}	2014-06-12	publication			{}	{""}	{""}						{"Aerospace Engineering","Engineering Mechanics","Scopus-indexed journals"}	f	2021-04-25 07:18:05.238375	2021-04-25 07:18:05.238375	\N
\.


--
-- Data for Name: publication_creator; Type: TABLE DATA; Schema: public; Owner: suongsun
--

COPY public.publication_creator (publication_id, creator_email, author_order, db_created_on, db_updated_on) FROM stdin;
1	hungpn@vnu.edu.vn	0	2021-04-21 13:17:45.469346	2021-04-21 13:17:45.469346
1	aoki@jaist.ac.jp	1	2021-04-21 13:17:45.470018	2021-04-21 13:17:45.470018
1	katayama@jaist.ac.jp	2	2021-04-21 13:17:45.47061	2021-04-21 13:17:45.47061
2	hungpn@vnu.edu.vn	0	2021-04-21 13:57:38.766789	2021-04-21 13:57:38.766789
2	katayama@jaist.ac.jp	2	2021-04-21 13:57:38.768382	2021-04-21 13:57:38.768382
2	aoki@jaist.ac.jp	1	2021-04-21 13:57:38.768825	2021-04-21 13:57:38.768825
3	hungpn@vnu.edu.vn	1	2021-04-21 13:59:08.32841	2021-04-21 13:59:08.32841
3	daovt@vnu.edu.vn	0	2021-04-21 13:59:08.329764	2021-04-21 13:59:08.329764
3	hanv@vnu.edu.vn	2	2021-04-21 13:59:08.330844	2021-04-21 13:59:08.330844
4	hungpn@vnu.edu.vn	2	2021-04-21 17:15:22.843481	2021-04-21 17:15:22.843481
4	duonghn@vnu.edu.vn	0	2021-04-21 17:15:22.843836	2021-04-21 17:15:22.843836
4	trinhlk@vnu.edu.vn	1	2021-04-21 17:15:22.844511	2021-04-21 17:15:22.844511
5	inho@yonsei.ac.kr	1	2021-04-21 17:24:01.588492	2021-04-21 17:24:01.588492
5	muoitd@comp.nus.edu.sg	0	2021-04-21 17:24:01.588981	2021-04-21 17:24:01.588981
5	kangms@kaist.ac.uk	4	2021-04-21 17:24:01.588814	2021-04-21 17:24:01.588814
5	gijun@korea.edu	2	2021-04-21 17:24:01.58948	2021-04-21 17:24:01.58948
5	anh.vu@cst.cam.ac.uk	3	2021-04-21 17:24:01.590413	2021-04-21 17:24:01.590413
6	mizuhito@jaist.ac.jp	1	2021-04-21 17:27:36.619316	2021-04-21 17:27:36.619316
6	anh.vu@cst.cam.ac.uk	0	2021-04-21 17:27:36.619919	2021-04-21 17:27:36.619919
7	ildiko.pete@cst.cam.ac.uk	2	2021-04-21 17:36:37.17989	2021-04-21 17:36:37.17989
7	ilia.shumailov@cst.cam.ac.uk	5	2021-04-21 17:36:37.18025	2021-04-21 17:36:37.18025
7	alice.hutchings@cst.cam.ac.uk	6	2021-04-21 17:36:37.181175	2021-04-21 17:36:37.181175
7	ben.collier@cst.cam.ac.uk	3	2021-04-21 17:36:37.181825	2021-04-21 17:36:37.181825
7	jack.hughes@cst.cam.ac.uk	1	2021-04-21 17:36:37.181699	2021-04-21 17:36:37.181699
7	yiting.chua@cst.cam.ac.uk	4	2021-04-21 17:36:37.182124	2021-04-21 17:36:37.182124
7	anh.vu@cst.cam.ac.uk	0	2021-04-21 17:36:37.182514	2021-04-21 17:36:37.182514
8	anh.vu@cst.cam.ac.uk	0	2021-04-21 17:42:29.073114	2021-04-21 17:42:29.073114
9	hungpn@vnu.edu.vn	0	2021-04-21 17:50:53.333108	2021-04-21 17:50:53.333108
9	hanv@vnu.edu.vn	1	2021-04-21 17:50:53.333841	2021-04-21 17:50:53.333841
9	aoki@jaist.ac.jp	2	2021-04-21 17:50:53.334149	2021-04-21 17:50:53.334149
9	katayama@jaist.ac.jp	3	2021-04-21 17:50:53.335206	2021-04-21 17:50:53.335206
10	thangnt@vnu.edu.vn	1	2021-04-21 17:56:32.74969	2021-04-21 17:56:32.74969
10	katayama@jaist.ac.jp	2	2021-04-21 17:56:32.749814	2021-04-21 17:56:32.749814
10	hungpn@vnu.edu.vn	0	2021-04-21 17:56:32.750712	2021-04-21 17:56:32.750712
18	hanv@vnu.edu.vn	2	2021-04-22 09:22:45.033586	2021-04-22 09:22:45.033586
18	anhnd@vnu.edu.vn	0	2021-04-22 09:22:45.034254	2021-04-22 09:22:45.034254
18	hungpn@vnu.edu.vn	1	2021-04-22 09:22:45.035098	2021-04-22 09:22:45.035098
19	cuonglb@vnu.edu.vn	0	2021-04-22 09:28:56.607833	2021-04-22 09:28:56.607833
19	hungpn@vnu.edu.vn	1	2021-04-22 09:28:56.608137	2021-04-22 09:28:56.608137
20	giapnv@vnu.edu.vn	0	2021-04-22 22:58:16.547828	2021-04-22 22:58:16.547828
20	minhld@vnu.edu.vn	2	2021-04-22 22:58:16.548438	2021-04-22 22:58:16.548438
20	anh.vu@cst.cam.ac.uk	1	2021-04-22 22:58:16.548836	2021-04-22 22:58:16.548836
20	hieupx@vnu.edu.vn	3	2021-04-22 22:58:16.549194	2021-04-22 22:58:16.549194
21	hungpn@vnu.edu.vn	1	2021-04-23 00:55:39.272975	2021-04-23 00:55:39.272975
21	vietth@vnu.edu.vn	0	2021-04-23 00:55:39.274231	2021-04-23 00:55:39.274231
22	hungpn@vnu.edu.vn	1	2021-04-23 00:58:36.265249	2021-04-23 00:58:36.265249
22	anhnd@vnu.edu.vn	0	2021-04-23 00:58:36.265025	2021-04-23 00:58:36.265025
23	minhnl@jaist.ac.jp	1	2021-04-23 01:24:04.882321	2021-04-23 01:24:04.882321
23	susumu@tokoku.ac.jp	2	2021-04-23 01:24:04.882547	2021-04-23 01:24:04.882547
23	hieupx@vnu.edu.vn	0	2021-04-23 01:24:04.882968	2021-04-23 01:24:04.882968
24	tuct@vnu.edu.vn	0	2021-04-23 01:29:27.24451	2021-04-23 01:29:27.24451
24	hieupx@vnu.edu.vn	2	2021-04-23 01:29:27.24508	2021-04-23 01:29:27.24508
24	kaothanthong@tohoku.ac.jp	1	2021-04-23 01:29:27.245243	2021-04-23 01:29:27.245243
24	tokuyama@jaist.ac.jp	3	2021-04-23 01:29:27.245293	2021-04-23 01:29:27.245293
25	hanv@vnu.edu.vn	1	2021-04-23 01:35:15.858164	2021-04-23 01:35:15.858164
25	damhs@vnu.edu.vn	2	2021-04-23 01:35:15.858575	2021-04-23 01:35:15.858575
25	anhnv@vnu.edu.vn	0	2021-04-23 01:35:15.85871	2021-04-23 01:35:15.85871
26	hungpn@vnu.edu.vn	0	2021-04-25 06:27:29.406253	2021-04-25 06:27:29.406253
26	nguyetna@vnu.edu.vn	2	2021-04-25 06:27:29.408119	2021-04-25 06:27:29.408119
26	hanv@vnu.edu.vn	3	2021-04-25 06:27:29.408758	2021-04-25 06:27:29.408758
26	hienda@vnu.edu.vn	1	2021-04-25 06:27:29.410828	2021-04-25 06:27:29.410828
27	hungdv@vnu.edu.vn	2	2021-04-25 07:18:05.272878	2021-04-25 07:18:05.272878
27	hungpn@vnu.edu.vn	0	2021-04-25 07:18:05.272713	2021-04-25 07:18:05.272713
27	hoangta@vnu.edu.vn	1	2021-04-25 07:18:05.274953	2021-04-25 07:18:05.274953
\.


--
-- Data for Name: publication_division; Type: TABLE DATA; Schema: public; Owner: suongsun
--

COPY public.publication_division (publication_id, division_name, db_created_on, db_updated_on) FROM stdin;
1	Faculty of Information Technology (FIT)	2021-04-21 13:17:45.457921	2021-04-21 13:17:45.457921
2	Faculty of Information Technology (FIT)	2021-04-21 13:57:38.762313	2021-04-21 13:57:38.762313
3	Faculty of Information Technology (FIT)	2021-04-21 13:59:08.320812	2021-04-21 13:59:08.320812
4	Department of Civil Engineering and Transportation (CET)	2021-04-21 17:15:22.826245	2021-04-21 17:15:22.826245
4	Faculty of Information Technology (FIT)	2021-04-21 17:15:22.82626	2021-04-21 17:15:22.82626
4	School of Aerospace Engineering (SAE)	2021-04-21 17:15:22.826889	2021-04-21 17:15:22.826889
5	Advanced Institute of Engineering and Technology (AVITECH)	2021-04-21 17:24:01.581051	2021-04-21 17:24:01.581051
5	Faculty of Information Technology (FIT)	2021-04-21 17:24:01.58113	2021-04-21 17:24:01.58113
5	Key Laboratory for Smart Integrated Systems (SISLAB)	2021-04-21 17:24:01.58344	2021-04-21 17:24:01.58344
6	Faculty of Information Technology (FIT)	2021-04-21 17:27:36.60692	2021-04-21 17:27:36.60692
6	Center for Electronics and Telecommunications Research (CETR)	2021-04-21 17:27:36.604926	2021-04-21 17:27:36.604926
6	Key Laboratory for Smart Integrated Systems (SISLAB)	2021-04-21 17:27:36.610064	2021-04-21 17:27:36.610064
7	Center for Electronics and Telecommunications Research (CETR)	2021-04-21 17:36:37.170042	2021-04-21 17:36:37.170042
7	Faculty of Engineering Physics and Nanotechnology (FEPN)	2021-04-21 17:36:37.171443	2021-04-21 17:36:37.171443
7	Faculty of Agriculture Technology (FAT)	2021-04-21 17:36:37.170854	2021-04-21 17:36:37.170854
7	Faculty of Information Technology (FIT)	2021-04-21 17:36:37.172872	2021-04-21 17:36:37.172872
8	Key Laboratory for Nanotechnology (Nano Lab)	2021-04-21 17:42:29.063679	2021-04-21 17:42:29.063679
9	Faculty of Information Technology (FIT)	2021-04-21 17:50:53.326099	2021-04-21 17:50:53.326099
9	Center for Electronics and Telecommunications Research (CETR)	2021-04-21 17:50:53.325739	2021-04-21 17:50:53.325739
9	Faculty of Engineering Mechanics and Automation (FEMA)	2021-04-21 17:50:53.32583	2021-04-21 17:50:53.32583
10	Center for Electronics and Telecommunications Research (CETR)	2021-04-21 17:56:32.742055	2021-04-21 17:56:32.742055
10	Department of Civil Engineering and Transportation (CET)	2021-04-21 17:56:32.741669	2021-04-21 17:56:32.741669
10	Faculty of Information Technology (FIT)	2021-04-21 17:56:32.742956	2021-04-21 17:56:32.742956
18	Key Laboratory for Smart Integrated Systems (SISLAB)	2021-04-22 09:22:45.020208	2021-04-22 09:22:45.020208
18	Faculty of Information Technology (FIT)	2021-04-22 09:22:45.020035	2021-04-22 09:22:45.020035
18	Advanced Institute of Engineering and Technology (AVITECH)	2021-04-22 09:22:45.019884	2021-04-22 09:22:45.019884
19	Department of Civil Engineering and Transportation (CET)	2021-04-22 09:28:56.599047	2021-04-22 09:28:56.599047
19	Faculty of Information Technology (FIT)	2021-04-22 09:28:56.601302	2021-04-22 09:28:56.601302
20	Faculty of Engineering Physics and Nanotechnology (FEPN)	2021-04-22 22:58:16.540129	2021-04-22 22:58:16.540129
20	Faculty of Information Technology (FIT)	2021-04-22 22:58:16.54057	2021-04-22 22:58:16.54057
20	Advanced Institute of Engineering and Technology (AVITECH)	2021-04-22 22:58:16.539718	2021-04-22 22:58:16.539718
20	School of Aerospace Engineering (SAE)	2021-04-22 22:58:16.542129	2021-04-22 22:58:16.542129
21	Advanced Institute of Engineering and Technology (AVITECH)	2021-04-23 00:55:39.268228	2021-04-23 00:55:39.268228
21	Faculty of Information Technology (FIT)	2021-04-23 00:55:39.269494	2021-04-23 00:55:39.269494
22	Faculty of Information Technology (FIT)	2021-04-23 00:58:36.256517	2021-04-23 00:58:36.256517
22	Key Laboratory for Smart Integrated Systems (SISLAB)	2021-04-23 00:58:36.257159	2021-04-23 00:58:36.257159
22	Faculty of Engineering Mechanics and Automation (FEMA)	2021-04-23 00:58:36.25586	2021-04-23 00:58:36.25586
23	Department of Civil Engineering and Transportation (CET)	2021-04-23 01:24:04.873289	2021-04-23 01:24:04.873289
23	Center for Electronics and Telecommunications Research (CETR)	2021-04-23 01:24:04.87392	2021-04-23 01:24:04.87392
23	Faculty of Information Technology (FIT)	2021-04-23 01:24:04.875302	2021-04-23 01:24:04.875302
23	Faculty of Engineering Mechanics and Automation (FEMA)	2021-04-23 01:24:04.874624	2021-04-23 01:24:04.874624
23	Key Laboratory for Smart Integrated Systems (SISLAB)	2021-04-23 01:24:04.880156	2021-04-23 01:24:04.880156
24	Department of Civil Engineering and Transportation (CET)	2021-04-23 01:29:27.239854	2021-04-23 01:29:27.239854
24	School of Aerospace Engineering (SAE)	2021-04-23 01:29:27.24171	2021-04-23 01:29:27.24171
24	Key Laboratory for Nanotechnology (Nano Lab)	2021-04-23 01:29:27.241538	2021-04-23 01:29:27.241538
25	Center for Electronics and Telecommunications Research (CETR)	2021-04-23 01:35:15.850569	2021-04-23 01:35:15.850569
25	Faculty of Information Technology (FIT)	2021-04-23 01:35:15.851445	2021-04-23 01:35:15.851445
25	Faculty of Engineering Mechanics and Automation (FEMA)	2021-04-23 01:35:15.850882	2021-04-23 01:35:15.850882
26	Department of Civil Engineering and Transportation (CET)	2021-04-25 06:27:29.390011	2021-04-25 06:27:29.390011
26	Faculty of Electronics and Telecommunications (FET)	2021-04-25 06:27:29.390366	2021-04-25 06:27:29.390366
26	Key Laboratory for Nanotechnology (Nano Lab)	2021-04-25 06:27:29.393329	2021-04-25 06:27:29.393329
26	Faculty of Information Technology (FIT)	2021-04-25 06:27:29.393293	2021-04-25 06:27:29.393293
27	Faculty of Information Technology (FIT)	2021-04-25 07:18:05.264447	2021-04-25 07:18:05.264447
27	Advanced Institute of Engineering and Technology (AVITECH)	2021-04-25 07:18:05.262378	2021-04-25 07:18:05.262378
27	Faculty of Engineering Mechanics and Automation (FEMA)	2021-04-25 07:18:05.264317	2021-04-25 07:18:05.264317
\.


--
-- Data for Name: publication_editor; Type: TABLE DATA; Schema: public; Owner: suongsun
--

COPY public.publication_editor (publication_id, editor_email, db_created_on, db_updated_on) FROM stdin;
1		2021-04-21 13:17:45.466829	2021-04-21 13:17:45.466829
4		2021-04-21 17:15:22.849003	2021-04-21 17:15:22.849003
5		2021-04-21 17:24:01.590906	2021-04-21 17:24:01.590906
6		2021-04-21 17:27:36.61958	2021-04-21 17:27:36.61958
7		2021-04-21 17:36:37.182924	2021-04-21 17:36:37.182924
8		2021-04-21 17:42:29.071028	2021-04-21 17:42:29.071028
9		2021-04-21 17:50:53.334856	2021-04-21 17:50:53.334856
10		2021-04-21 17:56:32.748552	2021-04-21 17:56:32.748552
18		2021-04-22 09:22:45.035317	2021-04-22 09:22:45.035317
19		2021-04-22 09:28:56.607494	2021-04-22 09:28:56.607494
20		2021-04-22 22:58:16.548643	2021-04-22 22:58:16.548643
21		2021-04-23 00:55:39.276326	2021-04-23 00:55:39.276326
22		2021-04-23 00:58:36.266484	2021-04-23 00:58:36.266484
23		2021-04-23 01:24:04.881953	2021-04-23 01:24:04.881953
24		2021-04-23 01:29:27.245786	2021-04-23 01:29:27.245786
25		2021-04-23 01:35:15.859001	2021-04-23 01:35:15.859001
26		2021-04-25 06:27:29.410649	2021-04-25 06:27:29.410649
27		2021-04-25 07:18:05.275795	2021-04-25 07:18:05.275795
\.


--
-- Data for Name: user_division; Type: TABLE DATA; Schema: public; Owner: suongsun
--

COPY public.user_division (user_email, division_name, db_created_on, db_updated_on) FROM stdin;
admin@eprints.vnu.edu.vn	Advanced Institute of Engineering and Technology (AVITECH)	2021-04-21 14:04:26.204889	2021-04-21 14:04:26.204889
admin@eprints.vnu.edu.vn	Department of Civil Engineering and Transportation (CET)	2021-04-21 14:04:26.217901	2021-04-21 14:04:26.217901
admin@eprints.vnu.edu.vn	Center for Electronics and Telecommunications Research (CETR)	2021-04-21 14:04:26.219921	2021-04-21 14:04:26.219921
admin@eprints.vnu.edu.vn	Faculty of Agriculture Technology (FAT)	2021-04-21 14:04:26.221502	2021-04-21 14:04:26.221502
admin@eprints.vnu.edu.vn	Faculty of Electronics and Telecommunications (FET)	2021-04-21 14:04:26.223285	2021-04-21 14:04:26.223285
admin@eprints.vnu.edu.vn	Faculty of Engineering Mechanics and Automation (FEMA)	2021-04-21 14:04:26.224952	2021-04-21 14:04:26.224952
admin@eprints.vnu.edu.vn	Faculty of Engineering Physics and Nanotechnology (FEPN)	2021-04-21 14:04:56.695819	2021-04-21 14:04:56.695819
admin@eprints.vnu.edu.vn	Faculty of Information Technology (FIT)	2021-04-21 14:04:59.405122	2021-04-21 14:04:59.405122
admin@eprints.vnu.edu.vn	Key Laboratory for Nanotechnology (Nano Lab)	2021-04-21 14:05:01.32242	2021-04-21 14:05:01.32242
admin@eprints.vnu.edu.vn	School of Aerospace Engineering (SAE)	2021-04-21 14:05:03.077995	2021-04-21 14:05:03.077995
admin@eprints.vnu.edu.vn	Key Laboratory for Smart Integrated Systems (SISLAB)	2021-04-21 14:05:04.649384	2021-04-21 14:05:04.649384
thangnt@vnu.edu.vn	Faculty of Information Technology (FIT)	2021-04-22 07:34:57.909383	2021-04-22 07:34:57.909383
daovt@vnu.edu.vn	Faculty of Information Technology (FIT)	2021-04-21 13:59:08.33428	2021-04-21 13:59:08.33428
giapnv@vnu.edu.vn	School of Aerospace Engineering (SAE)	2021-04-22 22:58:16.551143	2021-04-22 22:58:16.551143
minhld@vnu.edu.vn	Advanced Institute of Engineering and Technology (AVITECH)	2021-04-22 22:58:16.55185	2021-04-22 22:58:16.55185
gijun@korea.edu	Korea University	2021-04-21 17:24:01.593074	2021-04-21 17:24:01.593074
muoitd@comp.nus.edu.sg	National University of Singapore	2021-04-21 17:24:01.593674	2021-04-21 17:24:01.593674
kangms@kaist.ac.uk	Korea Advanced Institute of Science and Technology	2021-04-21 17:24:01.593656	2021-04-21 17:24:01.593656
inho@yonsei.ac.kr	Yonsei University	2021-04-21 17:24:01.594254	2021-04-21 17:24:01.594254
anh.vu@cst.cam.ac.uk	Faculty of Information Technology (FIT)	2021-04-22 22:58:43.058313	2021-04-22 22:58:43.058313
mizuhito@jaist.ac.jp	Japan Advanced Institute of Science and Technology	2021-04-21 17:27:36.62309	2021-04-21 17:27:36.62309
vietth@vnu.edu.vn	Advanced Institute of Engineering and Technology (AVITECH)	2021-04-23 00:55:39.278356	2021-04-23 00:55:39.278356
ildiko.pete@cst.cam.ac.uk	University of Cambridge	2021-04-21 17:36:37.185139	2021-04-21 17:36:37.185139
ilia.shumailov@cst.cam.ac.uk	University of Cambridge	2021-04-21 17:36:37.184823	2021-04-21 17:36:37.184823
jack.hughes@cst.cam.ac.uk	University of Cambridge	2021-04-21 17:36:37.185388	2021-04-21 17:36:37.185388
alice.hutchings@cst.cam.ac.uk	University of Cambridge	2021-04-21 17:36:37.185914	2021-04-21 17:36:37.185914
ben.collier@cst.cam.ac.uk	University of Cambridge	2021-04-21 17:36:37.186118	2021-04-21 17:36:37.186118
yiting.chua@cst.cam.ac.uk	University of Cambridge	2021-04-21 17:36:37.186337	2021-04-21 17:36:37.186337
aoki@jaist.ac.jp	Japan Advanced Institute of Science and Technology (JAIST)	2021-04-21 17:50:53.33787	2021-04-21 17:50:53.33787
minhnl@jaist.ac.jp	Japan Advanced Institute of Science and Technology	2021-04-23 01:24:04.885143	2021-04-23 01:24:04.885143
susumu@tokoku.ac.jp	Tohoku University	2021-04-23 01:24:04.885389	2021-04-23 01:24:04.885389
katayama@jaist.ac.jp	Japan Advanced Institute of Science and Technology (JAIST)	2021-04-21 17:56:32.753658	2021-04-21 17:56:32.753658
trinhlk@vnu.edu.vn	Faculty of Engineering Mechanics and Automation (FEMA)	2021-04-21 17:58:04.462362	2021-04-21 17:58:04.462362
tuct@vnu.edu.vn	School of Aerospace Engineering (SAE)	2021-04-23 01:29:27.246947	2021-04-23 01:29:27.246947
kaothanthong@tohoku.ac.jp	Tohoku University	2021-04-23 01:29:27.247498	2021-04-23 01:29:27.247498
hieupx@vnu.edu.vn	Faculty of Engineering Physics and Nanotechnology (FEPN)	2021-04-23 01:29:27.247654	2021-04-23 01:29:27.247654
tokuyama@jaist.ac.jp	Tohoku University	2021-04-23 01:29:27.248219	2021-04-23 01:29:27.248219
anhnv@vnu.edu.vn	Center for Electronics and Telecommunications Research (CETR)	2021-04-23 01:35:15.862365	2021-04-23 01:35:15.862365
damhs@vnu.edu.vn	Faculty of Engineering Mechanics and Automation (FEMA)	2021-04-23 01:35:15.862581	2021-04-23 01:35:15.862581
duonghn@vnu.edu.vn	Faculty of Information Technology (FIT)	2021-04-24 06:00:11.900235	2021-04-24 06:00:11.900235
cuonglb@vnu.edu.vn	Department of Civil Engineering and Transportation (CET)	2021-04-24 16:38:51.381683	2021-04-24 16:38:51.381683
anhnd@vnu.edu.vn	Faculty of Information Technology (FIT)	2021-04-25 04:07:11.441543	2021-04-25 04:07:11.441543
nguyetna@vnu.edu.vn	Key Laboratory for Nanotechnology (Nano Lab)	2021-04-25 06:27:29.421092	2021-04-25 06:27:29.421092
hienda@vnu.edu.vn	Department of Civil Engineering and Transportation (CET)	2021-04-25 06:27:29.422519	2021-04-25 06:27:29.422519
hanv@vnu.edu.vn	Faculty of Information Technology (FIT)	2021-04-25 06:30:29.296271	2021-04-25 06:30:29.296271
hungdv@vnu.edu.vn	Advanced Institute of Engineering and Technology (AVITECH)	2021-04-25 07:18:05.278016	2021-04-25 07:18:05.278016
hoangta@vnu.edu.vn	Faculty of Engineering Mechanics and Automation (FEMA)	2021-04-25 07:18:05.283334	2021-04-25 07:18:05.283334
		2021-04-25 07:18:05.283954	2021-04-25 07:18:05.283954
hungpn@vnu.edu.vn	Faculty of Information Technology (FIT)	2021-04-25 07:18:05.283973	2021-04-25 07:18:05.283973
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: suongsun
--

COPY public.users (email, family_name, given_name, hide_email, password, address, is_admin, description, registration_date, last_login, is_approved, db_created_on, db_updated_on, academic_title, manager_title, union_title) FROM stdin;
admin@eprints.vnu.edu.vn	Admin	Eprints	t	$2b$10$3lAAoKsK0xSgjs4eyaDIAOyA6Fbhdqw/n//O..9Mx7CwS71jjp31G	\N	t	Super admin of Eprints	\N	\N	t	2021-04-21 13:59:18.329771	2021-04-21 13:59:18.329771	None	None	None
daovt@vnu.edu.vn	Vu	Thi Dao	t	\N	\N	f	\N	\N	\N	f	2021-04-21 13:42:51.38906	2021-04-21 13:42:51.38906	None	None	None
kangms@kaist.ac.uk	Kang	Min Suk	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:24:01.58406	2021-04-21 17:24:01.58406	None	None	None
inho@yonsei.ac.kr	Choi	Inho	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:24:01.584375	2021-04-21 17:24:01.584375	None	None	None
gijun@korea.edu	Moon	Gi Jun	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:24:01.58515	2021-04-21 17:24:01.58515	None	None	None
muoitd@comp.nus.edu.sg	Tran	Duc Muoi	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:24:01.586292	2021-04-21 17:24:01.586292	None	None	None
giapnv@vnu.edu.vn	Nguyen	Van Giap	t	\N	\N	f	\N	\N	\N	f	2021-04-22 22:58:16.542623	2021-04-22 22:58:16.542623	None	None	None
mizuhito@jaist.ac.jp	Ogawa	Mizuhito	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:27:36.611288	2021-04-21 17:27:36.611288	None	None	None
minhld@vnu.edu.vn	Le	Dinh Minh	t	\N	\N	f	\N	\N	\N	f	2021-04-22 22:58:16.545377	2021-04-22 22:58:16.545377	None	None	None
ilia.shumailov@cst.cam.ac.uk	Ilia 	Shumailov	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:36:37.17422	2021-04-21 17:36:37.17422	None	None	None
ildiko.pete@cst.cam.ac.uk	Pete	Ildiko	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:36:37.173674	2021-04-21 17:36:37.173674	None	None	None
jack.hughes@cst.cam.ac.uk	Hughes	Jack	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:36:37.175908	2021-04-21 17:36:37.175908	None	None	None
alice.hutchings@cst.cam.ac.uk	Alice	Hutchings	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:36:37.176516	2021-04-21 17:36:37.176516	None	None	None
ben.collier@cst.cam.ac.uk	Collier	Ben	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:36:37.176743	2021-04-21 17:36:37.176743	None	None	None
yiting.chua@cst.cam.ac.uk	Chua	Yi Ting	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:36:37.177818	2021-04-21 17:36:37.177818	None	None	None
anh.vu@cst.cam.ac.uk	Vu	Anh V.	t	$2b$10$yTK9w7DjoA3MZaAkNk4igOx5a0bzHw5MF1J2ZCyTVI5/hkb6yn94G	E3, 144 Xuan Thuy Street, Cau Giay, Hanoi	f	Anh is a researcher at Cambridge Cybercrime Center, University of Cambridge	2021-04-23 05:58:42.993	\N	t	2021-04-21 17:24:01.586336	2021-04-21 17:24:01.586336	None	None	None
aoki@jaist.ac.jp	Aoki	Toshiaki	t	\N	\N	f	\N	\N	\N	f	2021-04-21 13:17:45.460685	2021-04-21 13:17:45.460685	None	None	None
vietth@vnu.edu.vn	Tran	Hoang Viet	t	\N	\N	f	\N	\N	\N	f	2021-04-23 00:55:39.269784	2021-04-23 00:55:39.269784	None	None	None
katayama@jaist.ac.jp	Katayama	Takuya	t	\N	\N	f	\N	\N	\N	f	2021-04-21 13:17:45.460939	2021-04-21 13:17:45.460939	None	None	None
trinhlk@vnu.edu.vn	Le	Khanh Trinh	t	$2b$10$nawjaHQqZRyQGClbJbKhb.cr/hXpjCTETDPt0u6I51C8RuTGknIua	E3, 144 Xuan Thuy, Cau Giay	f	Trinh is a researcher and lecturer at University of Engineering and Technology	2021-04-22 00:58:04.389	\N	t	2021-04-21 17:15:22.827571	2021-04-21 17:15:22.827571	None	None	None
susumu@tokoku.ac.jp	Horiguchi	Susumu	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:24:04.877079	2021-04-23 01:24:04.877079	None	None	None
minhnl@jaist.ac.jp	Nguyen	Le Minh	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:24:04.876181	2021-04-23 01:24:04.876181	None	None	None
tuct@vnu.edu.vn	Nguyen	Cam Tu	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:29:27.241735	2021-04-23 01:29:27.241735	None	None	None
kaothanthong@tohoku.ac.jp	Kaothanthong	Natsuda	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:29:27.242358	2021-04-23 01:29:27.242358	None	None	None
hieupx@vnu.edu.vn	Phan	Xuan Hieu	t	\N	\N	f	\N	\N	\N	f	2021-04-22 22:58:16.546992	2021-04-22 22:58:16.546992	None	None	None
tokuyama@jaist.ac.jp	Tokuyama	Takeshi	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:29:27.243709	2021-04-23 01:29:27.243709	None	None	None
anhnv@vnu.edu.vn	Nguyen	Viet Anh	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:35:15.852959	2021-04-23 01:35:15.852959	None	None	None
damhs@vnu.edu.vn	Ho	Sy Dam	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:35:15.854129	2021-04-23 01:35:15.854129	None	None	None
thangnt@vnu.edu.vn	Nguyen	Truong Thang	t	$2b$10$VkDHeubWEunwUHfaL4h3hOEuaKeCsj4BbV92hW/.FdzL8Yp9AV70q	E3, 144 Xuan Thuy	f	Thang is a student in Software Engineering Department	2021-04-22 14:34:57.842	\N	t	2021-04-21 17:56:32.747033	2021-04-21 17:56:32.747033	None	None	None
duonghn@vnu.edu.vn	Hoang	Minh Duong	t	$2b$10$LTKbTaL0PAm7RtxDBb25Ge9kHmDpLmemP/7rFih3UrUfs7p6YJKnm	E3, 144 Xuan Thuy	f	Duong is a student in the Software Engineering Department	2021-04-24 13:00:11.815	\N	t	2021-04-21 17:15:22.827578	2021-04-21 17:15:22.827578	None	None	None
hungdv@vnu.edu.vn	Dang	Van Hung	t	\N	\N	f	\N	\N	\N	f	2021-04-25 07:18:05.266737	2021-04-25 07:18:05.266737	None	None	None
			t	\N	\N	f	\N	\N	\N	f	2021-04-21 13:17:45.461383	2021-04-21 13:17:45.461383	None	None	None
hoangta@vnu.edu.vn	Truong	Anh Hoang	t	\N	\N	f	\N	\N	\N	f	2021-04-25 07:18:05.268165	2021-04-25 07:18:05.268165	None	None	None
hungpn@vnu.edu.vn	Pham	Ngoc Hung	t	$2b$10$KUnsK/0yFPk9VGqP2ZbFDOjuT8ci4Z96rzqcNIfWfm/AGM2knUgga	144 Xuan Thuy	t	Hung is an associate professor of software engineering	2021-04-25 01:22:21.743	\N	t	2021-04-21 13:17:45.459501	2021-04-21 13:17:45.459501	Associate Professor.	Deputy Head of Department	Secretary
anhnd@vnu.edu.vn	Nguyen	Duc Anh	t	$2b$10$FBRYPSqXF.3oMugyAT..MOqTT3vejDlsVc.ML7WTPLN0jct3x6C36	320 E3, 144 Xuan Thuy	f	Duc Anh is a lecturer and researcher at University of Engineering and Technology, Vietnam National University	2021-04-25 11:07:11.337	\N	t	2021-04-22 09:22:45.020613	2021-04-22 09:22:45.020613	Dr.	None	Deputy Secretary
cuonglb@vnu.edu.vn	Le	Ba Cuong	t	$2b$10$AbpPTo7kRN5F5gqi1b0.EeXJaiauAtR1JhfpfmBzlPKle.4hCpO3.	E3, 144 Xuan Thuy	t	Cuong is a researcher at UET, VNU, Vietnam	2021-04-24 23:38:51.294	\N	t	2021-04-22 09:26:30.260881	2021-04-22 09:26:30.260881	Professor.	Rector	Party Secretary
hienda@vnu.edu.vn	Dao	Anh Hien	t	\N	\N	f	\N	\N	\N	f	2021-04-25 06:17:03.06111	2021-04-25 06:17:03.06111	None	None	None
nguyetna@vnu.edu.vn	Nguyen	Anh Nguyet	t	\N	\N	f	\N	\N	\N	f	2021-04-25 06:17:03.061621	2021-04-25 06:17:03.061621	None	None	None
hanv@vnu.edu.vn	Nguyen	Viet Ha	t	$2b$10$EpjcfTobPvxVb3I6ozHT1Oota5zOn6IdfSaEicFydNRipJ8Es9sd6	E3 Building, 144 Xuan Thuy Street, Cau Giay, Hanoi	f	Nguyen is the rector of University of Engineering and Technology, Vietnam National University	2021-04-25 13:30:29.214	\N	t	2021-04-21 13:42:51.389733	2021-04-21 13:42:51.389733	Associate Professor.	Rector	Deputy Party Secretary
\.


--
-- Name: publication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: suongsun
--

SELECT pg_catalog.setval('public.publication_id_seq', 27, true);


--
-- Name: divisions divisions_pkey; Type: CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.divisions
    ADD CONSTRAINT divisions_pkey PRIMARY KEY (name);


--
-- Name: publication_creator publication_creator_pkey; Type: CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.publication_creator
    ADD CONSTRAINT publication_creator_pkey PRIMARY KEY (publication_id, creator_email);


--
-- Name: publication_division publication_division_pkey; Type: CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.publication_division
    ADD CONSTRAINT publication_division_pkey PRIMARY KEY (publication_id, division_name);


--
-- Name: publication_editor publication_editor_pkey; Type: CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.publication_editor
    ADD CONSTRAINT publication_editor_pkey PRIMARY KEY (publication_id, editor_email);


--
-- Name: publication publication_pkey; Type: CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.publication
    ADD CONSTRAINT publication_pkey PRIMARY KEY (id);


--
-- Name: user_division user_division_pkey; Type: CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.user_division
    ADD CONSTRAINT user_division_pkey PRIMARY KEY (user_email, division_name);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (email);


--
-- Name: publication_creator publication_creator_creator_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.publication_creator
    ADD CONSTRAINT publication_creator_creator_email_fkey FOREIGN KEY (creator_email) REFERENCES public.users(email);


--
-- Name: publication_creator publication_creator_publication_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.publication_creator
    ADD CONSTRAINT publication_creator_publication_id_fkey FOREIGN KEY (publication_id) REFERENCES public.publication(id);


--
-- Name: publication_division publication_division_division_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.publication_division
    ADD CONSTRAINT publication_division_division_name_fkey FOREIGN KEY (division_name) REFERENCES public.divisions(name);


--
-- Name: publication_division publication_division_publication_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.publication_division
    ADD CONSTRAINT publication_division_publication_id_fkey FOREIGN KEY (publication_id) REFERENCES public.publication(id);


--
-- Name: publication_editor publication_editor_editor_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.publication_editor
    ADD CONSTRAINT publication_editor_editor_email_fkey FOREIGN KEY (editor_email) REFERENCES public.users(email);


--
-- Name: publication_editor publication_editor_publication_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.publication_editor
    ADD CONSTRAINT publication_editor_publication_id_fkey FOREIGN KEY (publication_id) REFERENCES public.publication(id);


--
-- Name: user_division user_division_division_name_fkey; Type: FK CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.user_division
    ADD CONSTRAINT user_division_division_name_fkey FOREIGN KEY (division_name) REFERENCES public.divisions(name);


--
-- Name: user_division user_division_user_email_fkey; Type: FK CONSTRAINT; Schema: public; Owner: suongsun
--

ALTER TABLE ONLY public.user_division
    ADD CONSTRAINT user_division_user_email_fkey FOREIGN KEY (user_email) REFERENCES public.users(email);


--
-- PostgreSQL database dump complete
--

