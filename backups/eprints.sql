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
Japan Advanced Institute of Science and Technology (JAIST)	2021-04-21 13:17:45.463707	2021-04-21 13:17:45.463707
Yonsei University	2021-04-21 17:24:01.586878	2021-04-21 17:24:01.586878
Korea Advanced Institute of Science and Technology	2021-04-21 17:24:01.586448	2021-04-21 17:24:01.586448
National University of Singapore	2021-04-21 17:24:01.588114	2021-04-21 17:24:01.588114
Korea University	2021-04-21 17:24:01.587758	2021-04-21 17:24:01.587758
University of Cambridge	2021-04-21 17:24:01.587981	2021-04-21 17:24:01.587981
Japan Advanced Institute of Science and Technology	2021-04-21 17:27:36.616736	2021-04-21 17:27:36.616736
Tohoku University	2021-04-23 01:24:04.880474	2021-04-23 01:24:04.880474
FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 17:10:55.839926	2021-04-29 17:10:55.839926
FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 17:10:55.8426	2021-04-29 17:10:55.8426
FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 17:10:55.843535	2021-04-29 17:10:55.843535
FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 17:10:55.844387	2021-04-29 17:10:55.844387
FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 17:10:55.845198	2021-04-29 17:10:55.845198
FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 17:10:55.846172	2021-04-29 17:10:55.846172
FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 17:10:55.847252	2021-04-29 17:10:55.847252
FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 17:10:55.848942	2021-04-29 17:10:55.848942
FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 17:10:55.849815	2021-04-29 17:10:55.849815
FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 17:10:55.850676	2021-04-29 17:10:55.850676
FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 17:10:55.851374	2021-04-29 17:10:55.851374
FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 17:10:55.939799	2021-04-29 17:10:55.939799
FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 17:10:55.941005	2021-04-29 17:10:55.941005
FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 17:10:55.941957	2021-04-29 17:10:55.941957
FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 17:10:56.74323	2021-04-29 17:10:56.74323
Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 17:23:26.903141	2021-04-29 17:23:26.903141
Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-04-29 17:39:19.097895	2021-04-29 17:39:19.097895
FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-04-29 17:39:19.10182	2021-04-29 17:39:19.10182
FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 17:39:19.103201	2021-04-29 17:39:19.103201
FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-04-29 17:39:19.104256	2021-04-29 17:39:19.104256
FEPN: Bộ môn Công Nghệ Quang Tử	2021-04-29 17:40:57.80069	2021-04-29 17:40:57.80069
Viện Công Nghệ Hàng Không Vũ Trụ (SAE)	2021-04-29 18:14:17.761599	2021-04-29 18:14:17.761599
SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-04-29 18:14:17.765695	2021-04-29 18:14:17.765695
SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không	2021-04-29 18:14:17.768563	2021-04-29 18:14:17.768563
SAE: Bộ môn Khoa Học Dữ Liệu Không Gian	2021-04-29 18:14:17.769743	2021-04-29 18:14:17.769743
Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)	2021-04-29 18:21:42.251305	2021-04-29 18:21:42.251305
FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-04-29 18:21:42.253714	2021-04-29 18:21:42.253714
FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-04-29 18:21:42.254896	2021-04-29 18:21:42.254896
FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-04-29 18:21:42.255892	2021-04-29 18:21:42.255892
FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-04-29 18:21:42.256931	2021-04-29 18:21:42.256931
FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-04-29 18:21:42.257986	2021-04-29 18:21:42.257986
Phòng Thí nghiệm trọng điểm Công Nghệ Micro và Nano (NANOLAB)	2021-04-29 18:37:18.42901	2021-04-29 18:37:18.42901
Bộ môn Công Nghệ Xây Dựng - Giao Thông (CET)	2021-04-29 19:07:37.169635	2021-04-29 19:07:37.169635
Khoa Công Nghệ Nông Nghiệp (FAT)	2021-04-29 19:07:37.176575	2021-04-29 19:07:37.176575
Khoa Điện Tử - Viễn Thông (FET)	2021-04-29 19:12:47.161082	2021-04-29 19:12:47.161082
FET: Bộ môn Điện tử và Kỹ thuật máy tính	2021-04-29 19:12:47.163879	2021-04-29 19:12:47.163879
FET: Bộ môn Hệ thống Viễn thông	2021-04-29 19:12:47.164831	2021-04-29 19:12:47.164831
FET: Bộ môn Kỹ thuật Robot	2021-04-29 19:12:47.165681	2021-04-29 19:12:47.165681
FET: Bộ môn Thông tin Vô tuyến	2021-04-29 19:12:47.16655	2021-04-29 19:12:47.16655
FET: Bộ môn Vi cơ điện tử và Vi hệ thống	2021-04-29 19:12:47.167976	2021-04-29 19:12:47.167976
FET: Phòng thí nghiệm Tín hiệu và Hệ thống	2021-04-29 19:12:47.169313	2021-04-29 19:12:47.169313
FET: Phòng thực tập Điện tử – Viễn thông	2021-04-29 19:12:47.170591	2021-04-29 19:12:47.170591
Viện tiến tiến về Kỹ thuật và Công nghệ (AVITECH)	2021-04-29 19:17:04.685366	2021-04-29 19:17:04.685366
Phòng thí nghiệm trọng điểm Các Hệ Thống Tích Hợp Thông Minh (SISLAB)	2021-04-29 19:19:25.471132	2021-04-29 19:19:25.471132
Trung tâm Nghiên cứu Điện tử - Viễn thông (CETR)	2021-04-29 19:20:15.767763	2021-04-29 19:20:15.767763
Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-04-29 19:23:38.832118	2021-04-29 19:23:38.832118
	2021-05-09 11:48:46.835598	2021-05-09 11:48:46.835598
Khoa Công Nghệ Thông Tin (FIT	2021-05-09 18:05:38.37665	2021-05-09 18:05:38.37665
\.


--
-- Data for Name: publication; Type: TABLE DATA; Schema: public; Owner: suongsun
--

COPY public.publication (id, item_type, title, abstract, corporate_creators, is_refereed, status, kind, publication_title, institution, publication_department, presentation_type, monograph_type, thesis_type, issn_isbn, publisher, official_url, volume, place_of_publication, number_of_pages, patent_applicant, media_output, copyright_holder, number, page_range, date, date_type, identification_number, series_name, related_urls, funders, projects, contact_email_address, reference, uncontrolled_keywords, additional_infor, comments_and_suggestions, subjects, is_approved, db_created_on, db_updated_on, ranking) FROM stdin;
10	article	An assume-guarantee method for modular verification of evolving component-based software	An Assume-Guarantee Method for Modular Verification of Evolving Component-Based Software An Assume-Guarantee Method for Modular Verification of Evolving Component-Based Software Pham Ngoc Hung, Nguyen Truong Thang, and Takuya Katayama Japan Advanced Institute of Science and Technology – JAIST {hungpn, thang, katayama}@jaist.ac.jp Page 2. 2 DSN 2007 – WADS, Edinburgh, UK June 27, 2007 Contents Introduction Background A Framework for Modular Verification of Evolving CBS Assumption Regeneration Method Related Work & Conclusion Page 3. 3 DSN 2007 – WADS, Edinburgh, UK June 27, 2007 Component-Based Software (CBS) Structured from a set of well-defined components ➢ Ideally, components are plug-and-play ➢ Advantages: low development cost and time, flexible for changes, etc. One of key issues of CBS is "component consistency"	{""}	f	published	international	6th WADS in conjunction with the 37th Annual IEEE/IFIP Intenational Conference on Dependable Systems and Networks (DSN)									0		0				0	{160,165}	2007-06-14	publication			{}	{""}	{""}						{"Engineering Mechanics","ISI-indexed journals","Information Technology (IT)","Scopus-indexed journals"}	f	2021-04-21 17:56:32.724028	2021-04-21 17:56:32.724028	Q1, Q2 (ISI)
20	thesis	Healthkee: a symptom checker and personalized health information service	With improvements in technology and access to the internet, people are increasingly using the Internet to research their health concerns. According to Pew Research Center’s Internet & American Life Project, more than 35% of adults in the United States regularly use the Internet to self diagnose their ailments, using it both for non-urgent symptoms and for urgent symptoms. There are many systems in English can support self-diagnosis as well as provide medical information such as WebMD, Mayo Clinic, NHS Choice, etc. However, there are not many same systems in Vietnam that can provide reliable and easy to understand clinical information. Healthkee aims to become a smart health assistant for Vietnamese that provide personalized health information, which is accurate, fast and easy to understand anywhere, anytime.	{""}	f	published	domestic		University of Engineering and Technology	Information Technology			diploma				0		30				0	{0,0}	2016-04-23	publication			{}	{""}	{""}						{"Aerospace Engineering","Engineering Mechanics","Information Technology (IT)","Transportation Technology"}	t	2021-04-22 22:58:16.510843	2021-04-22 22:58:16.510843	\N
5	conference-workshop-item	A Stealthier Partitioning Attack against Bitcoin Peer-to-Peer Network	Network adversaries, such as malicious transit autonomous systems (ASes), have been shown to be capable of partitioning the Bitcoin’s peer-to-peer network via routing-level attacks; e.g., a network adversary exploits a BGP vulnerability and performs a prefix hijacking attack (viz. Apostolaki et al. [3]). Due to the nature of BGP operation, such a hijacking is globally observable and thus enables immediate detection of the attack and the identification of the perpetrator. In this paper, we present a stealthier attack, which we call the Erebus attack, that partitions the Bitcoin network without any routing manipulations, which makes the attack undetectable to control-plane and even to data-plane detectors. The novel aspect of Erebus is that it makes the adversary AS a natural man-in-the-middle network of all the peer connections of one or more targeted Bitcoin nodes by patiently influencing the targeted nodes’ peering decision. We show that affecting the peering decision of a Bitcoin node, which is believed to be infeasible after a series of bug patches against the earlier Eclipse attack [29], is possible for the network adversary that can use abundant network address resources (e.g., spoofing millions of IP addresses in many other ASes) reliably for an extended period of time at a negligible cost. The Erebus attack is readily available for large ASes, such as Tier-1 and large Tier-2 ASes, against the vast majority of 10K public Bitcoin nodes with only about 520 bit/s of attack traffic rate per targeted Bitcoin node and a modest (e.g., 5–6 weeks) attack execution period. The Erebus attack can be mounted by nation-state adversaries who would be willing to execute sophisticated attack strategies patiently to compromise cryptocurrencies (e.g., control the consensus, take down a cryptocurrency, censor transactions). As the attack exploits the topological advantage of being a network adversary but not the specific vulnerabilities of Bitcoin core, no quick patches seem to be available. We discuss that some naive solutions (e.g., whitelisting, rate-limiting) are ineffective and third-party proxy solutions may worsen the Bitcoin’s centralization problem. We provide some suggested modifications to the Bitcoin core and show that they effectively make the Erebus attack significantly harder; yet, their non-trivial changes to the Bitcoin’s network operation (e.g., peering dynamics, propagation delays) should be examined thoroughly before their wide deployment.	{""}	f	published	international	IEEE Symposium on Security and Privacy (S&P'20)			paper					https://ieeexplore.ieee.org/abstract/document/9152616/	0		0				0	{0,0}	2020-05-18	publication	10.1109/SP40000.2020.00027		{}	{"National University of Singapore."}	{"CRYSTAL Centre"}						{Communications,"Electronics and Computer Engineering","ISI-indexed journals","Information Technology (IT)","Scopus-indexed journals"}	t	2021-04-21 17:24:01.555111	2021-04-21 17:24:01.555111	ISI/Scopus Conference Proceedings or Reputed Sponsors
9	article	On optimization of minimized assumption generation method for component-based software verification	The minimized assumption generation has been recognized as an important improvement of the assume-guarantee verification method in order to generate minimal assumptions. The generated minimal assumptions can be used to recheck the whole component-based software at a lower computational cost. The method is not only fitted to component-based software but also has a potential to solve the state space explosion problem in model checking. However, the computational cost for generating the minimal assumption is very high so the method is difficult to be applied in practice. This paper presents an optimization as a continuous work of the minimized assumption generation method in order to reduce the complexity of the method. The key idea of this method is to find a smaller assumption in a sub-tree of the search tree containing the candidate assumptions using the depth-limited search strategy. With this approach, the improved method can generate assumptions with a lower computational cost and consumption memory than the minimized method. The generated assumptions are also effective for rechecking the systems at much lower computational cost in the context of software evolution. An implemented tool supporting the improved method and experimental results are also presented and discussed.\n\n	{""}	f	published	international	IEICE Transactions on Fundamentals of Electronics, Communications and Computer Sciences						1745-1337	The Institute of Electronics, Information and Communication Engineers	https://ieeexplore.ieee.org/document/6169862/	95		0				9	{1451,1460}	2012-09-01		10.1587/transfun.E95.A.1451		{}	{""}	{""}						{Communications,"Electronics and Computer Engineering","ISI-indexed journals","Information Technology (IT)","Scopus-indexed journals"}	t	2021-04-21 17:50:53.307054	2021-04-21 17:50:53.307054	Scopus
27	book	Giáo trình kiểm thử phần mềm	Giáo trình kiểm thử phần mềm	{""}	f	published	domestic								Nhà xuất bản ĐH Quốc Gia HN		0	Đại học Quốc Gia Hà Nội 	0				0	{0,0}	2014-06-12	publication			{}	{""}	{""}						{"Aerospace Engineering","Engineering Mechanics","ISI-indexed journals","Scopus-indexed journals"}	t	2021-04-25 07:18:05.238375	2021-04-25 07:18:05.238375	Domestic Book
25	article	Constructing a Bayesian belief network to generate learning path in adaptive hypermedia system	There are many methods and techniques which have been promoted to develop adaptive hypermedia systems [1]. Our model approach [2], generating adaptive courses based on learner’s profile which learner’s includes background, skills, style... etc. One of important steps in our model is to generate learning path adaptive for each learner. In this paper, we promote an algorithm based on shortest path search algorithm to evaluate learning object (LO) based on its attributes [3] and constructed a Bayesian Belief Network (BBN) to generate learning path for each learner.	{""}	f	published	international	Journal of Computer Science and Cybernetics							Vietnam National University		24		0				1	{12,19}	2008-12-11	publication			{}	{""}	{""}						{Communications,"Information Technology (IT)","Civil Engineering"}	f	2021-04-23 01:35:15.828248	2021-04-23 01:35:15.828248	VNU Journals
18	conference-workshop-item	A method for automated unit testing of C programs	This research proposes an automated test case generation method for C functions. In this method, the source code is transformed into a control flow graph corresponding to the given coverage criterion. After that, a list of feasible test paths are discovered by traversing the control flow graph using backtracking algorithm, symbolic execution, and Z3 solver. We also generate test cases for functions containing one loop or two-nested loop. A tool supporting the proposed method has been developed and applied to test on some C functions. The experimental results show the high coverage with the minimum number of test cases, the ability to improve the total time of the test case generation with a specified coverage criterion, and the increasing precision of checking the feasibility of test paths if comparing with the random technique. The experimental results display the potential usefulness of this tool for automated test case generation in practice.	{""}	f	published	domestic	National Foundation for Science and Technology Development Conference on Information and Computer Science (NICS)			paper					https://eprints.uet.vnu.edu.vn/eprints/id/eprint/2002/1/bare_conf.pdf	0		0				0	{0,0}	2016-09-14	publication			{}	{"Vietnam National University, Hanoi (VNU)"}	{QG.16.31}						{Communications,"Electronics and Computer Engineering","Engineering Physics","Information Technology (IT)"}	t	2021-04-22 09:22:45.005556	2021-04-22 09:22:45.005556	National Conference Proceedings Having ISBN
3	conference-workshop-item	A method for automated test data generation from sequence diagrams and object constraint language	This paper proposes an automated test data generation method from the information embedded in model elements such as Unified Modeling Language (UML) sequence diagrams, class diagrams, and Object Constraint Language (OCL). The method supports UML 2.0 sequence diagrams including eight kinds of combined fragments describing control flow of systems. Comparing with some approaches by using depth first search (DFS) or breadth first search (BFS) algorithms, the proposed method generates all possible test scenarios with the higher error uncover capability. Test data for testing loop fragment is also generated. Therefore, it helps to detect errors in testing loops and the concurrency errors such as safety and liveness property of the systems.	{""}	f	published	international	Proceedings of the Sixth International Symposium on Information and Communication Technology			paper					https://dl.acm.org/doi/pdf/10.1145/2833258.2833294	0		0				0	{0,0}	2015-12-03	publication	10.1145/2833258.2833294		{}	{""}	{""}						{"Electronics and Computer Engineering","Information Technology (IT)","Scopus-indexed journals"}	t	2021-04-21 13:42:51.372226	2021-04-21 13:42:51.372226	English Peer-reviewed Conference Proceedings
24	book-section	A feature-word-topic model for image annotation	Image annotation is to automatically associate semantic labels with images in order to obtain a more convenient way for indexing and searching images on the Web. This paper proposes a novel method for image annotation based on feature-word and word-topic distributions. The introduction of topics enables us to efficiently take word associations, such as {ocean, fish, coral}, into image annotation. Feature-word distributions are utilized to define weights in computation of topic distributions for annotation. By doing so, topic models in text mining can be applied directly in our method. Experiments show that our method is able to obtain promising improvements over the state-of-the-art method-Supervised Multiclass Labeling (SML)	{""}	f	published	international	Proceedings of the 19th ACM international conference on Information and knowledge management							ACM	https://dl.acm.org/doi/pdf/10.1145/1871437.1871652	10	Toronto, Ontario, Canada	0				30	{1481,1484}	2010-10-26		10.1145/1871437.1871652		{}	{""}	{""}						{Communications,"Engineering Physics","Information Technology (IT)","Transportation Technology"}	f	2021-04-23 01:29:27.224735	2021-04-23 01:29:27.224735	Internationally Published Book Chapter
22	book-section	A test data generation method for C/C++ projects	This research proposes an automated test data generation method for C/C++ projects to generate the lower number of test data while gaining higher code coverage in comparison with KLEE, CAUT, PathCrawler, and CREST. In order to do that, the proposed method contributes an algorithm named loop depth first search by combining both static testing and concolic testing together. Besides, the paper also provides an improvement symbolic execution for avoiding the initial test data problem in the concolic testing. Currently, a tool supporting the proposed method has been developed and applied to test on different C/C++ projects in several software companies. The experimental results show the higher coverage with the lower number of test data compared with the existing methods. The experimental results display the effectiveness and practical usefulness of the proposed method for automated test data generation in practice.	{""}	f	published	international	Proceedings of the Eighth International Symposium on Information and Communication Technology								https://dl.acm.org/doi/abs/10.1145/3155133.3155144	0		0				0	{431,438}	2017-12-07	publication	10.1145/3155133.3155144		{}	{""}	{""}						{Communications,"Engineering Physics","Information Technology (IT)","Scopus-indexed journals"}	t	2021-04-23 00:58:36.23289	2021-04-23 00:58:36.23289	Internationally Published Book Chapter
19	article	A Method for Generating Models of Black-box Components	The model-based approaches are difficult to be applied in practice due to the lack of formal models describing behaviors of systems. This paper proposes a method for generating accurate models of components in order to solve this issue in the context of the component-based systems. The key idea of this method is to generate minimal deterministic finite automata as the accurate models of the corresponding components. For this purpose, the proposed method first computes a set of traces as a regular language of a given component by executing all possible experiments over the alphabet of the component. This method then constructs a regular expression to represent this set. After that, a minimal deterministic finite automaton as an accurate model of the component is generated by applying the Thompson algorithm and some optimized activities. The generated models are useful for the existing model-based approaches, e.g., model checking and model-based testing in improving quality of component-based software. An implemented tool supporting the method and experimental results are also presented.	{""}	f	published	international	2012 Fourth International Conference on Knowledge and Systems Engineering			paper				IEEE	https://ieeexplore.ieee.org/abstract/document/6299422/	0		0				0	{217,222}	2012-08-17	publication	10.1109/KSE.2012.15		{}	{""}	{""}						{"Aerospace Engineering","Engineering Mechanics","Information Technology (IT)","Transportation Technology"}	t	2021-04-22 09:26:30.243074	2021-04-22 09:26:30.243074	Q3, Q4 (ISI)
26	article	Đặc tả và kiểm chứng tính bất biến của các hệ đa tác tử	Chứng minh tính đúng đắn của các hệ thống nói chung và các hệ đa tác tử nói riêng đang nhận được sự quan tâm nghiên cứu rộng rãi. Bài toán này sẽ khó khăn hơn khi các hệ đa tác tử có không gian trạng thái là vô hạn. Bài báo này đề xuất một phương pháp đặc tả và kiểm chứng các thuộc tính bất biến của các hệ đa tác tử đối với không gian trạng thái là vô hạn. Trong phương pháp này, hành vi của hệ thống cũng với các thuộc tính cần chứng minh được đặc tả bằng ngôn ngữ đại số. Không gian vô hạn các trạng thái của hệ thống được xác định đệ quy bằng cách chỉ ra trạng thái khởi tạo và cách chuyển đến các trạng thái tiếp theo từ một trạng thái bất kỳ của hệ thống. Chúng tôi sử dụng phương pháp quy nạp toán học để chứng minh tính thỏa mãn của các thuộc tính trên toàn bộ không gian trạng thái của hệ thống. Một ví dụ minh họa cho cũng được trình bày và thảo luận trong bài báo này nhằm minh chứng cho tính hiệu quả của phương pháp đề xuất.	{""}	f	published	domestic	Natural Sciences and Technology							VNU Journal of Science		27		0				4	{0,0}	2011-12-15	publication			{}	{""}	{""}	hungpham@gmail.com	Pham Ngoc Hung, UET, VNU	Software Engineering, Component-Based	There is no additional information needed	There is no comments	{"Electronics and Computer Engineering","Information Technology (IT)","Civil Engineering"}	t	2021-04-25 06:17:02.890062	2021-04-25 06:17:02.890062	VNU Journals
7	article	Generative software module development for domain-driven design with annotation-based domain specific language	Object-oriented domain-driven design (DDD) aims to iteratively develop software around a realistic model of the application domain, which both thoroughly captures the domain requirements and is technically feasible for implementation. The main focus of recent work in DDD has been on using a form of annotation-based domain specific language (aDSL), internal to an object-oriented programming language, to build the domain model. However, these work do not consider software modules as first-class objects and thus lack a method for their development.	{""}	f	published	international				paper					https://www.sciencedirect.com/science/article/abs/pii/S0950584919302563?via%3Dihub#!	13		0				32	{123,140}	2019-11-30	publication	https://doi.org/10.1016/j.infsof.2019.106239		{}	{}	{}						{Communications,"Engineering Mechanics","ISI-indexed journals","Information Technology (IT)","Scopus-indexed journals"}	f	2021-04-21 17:36:37.148343	2021-04-21 17:36:37.148343	VNU Journals
8	conference-workshop-item	Collaborative Learning Model for Cyberattack Detection Systems in IoT Industry 4.0	Although the development of IoT Industry 4.0 has brought breakthrough achievements in many sectors, e.g., manufacturing, healthcare, and agriculture, it also raises many security issues to human beings due to a huge of emerging cybersecurity threats recently. In this paper, we propose a novel collaborative learning-based intrusion detection system which can be efficiently implemented in IoT Industry 4.0. In the system under consideration, we develop smart “filters” which can be deployed at the IoT gateways to promptly detect and prevent cyberattacks. In particular, each filter uses the collected data in its network to train its cyberattack detection model based on the deep learning algorithm. After that, the trained model will be shared with other IoT gateways to improve the accuracy in detecting intrusions in the whole system. In this way, not only the detection accuracy is improved, but our proposed system also can significantly reduce the information disclosure as well as network traffic in exchanging data among the IoT gateways. Through thorough simulations on real datasets, we show that the performance obtained by our proposed method can outperform those of the conventional machine learning methods.	{""}	f	published	international	2020 IEEE Wireless Communications and Networking Conference (WCNC)	University of Cambridge	Computer Science and Technology	paper	technical-reportMonoType			Cambridge Cybercrime Centre Briefing Paper Series	https://ieeexplore.ieee.org/document/9120761	0	Cambridge, United Kingdom	2				0	{0,0}	2020-06-19	publication	10.1109/WCNC45663.2020.9120761		{}	{""}	{""}						{"Electronics and Computer Engineering","Information Technology (IT)"}	f	2021-04-21 17:42:29.041006	2021-04-21 17:42:29.041006	National Conference Proceedings Having ISBN
6	article	Autoencoder based Friendly Jamming	Physical layer security (PLS) provides lightweight security solutions in which security is achieved based on the inherent random characteristics of the wireless medium. In this paper, we consider the PLS approach called friendly jamming (FJ), which is more practical thanks to its low computational complexity. State-of-the-art methods require that legitimate users have full channel state information (CSI) of their channel. Thanks to the recent promising application of the autoencoder (AE) in communication, we propose a new FJ method for PLS using AE without prior knowledge of the CSI. The proposed AE-based FJ method can provide good secrecy performance while avoiding explicit CSI estimation. We also apply the recently proposed tool for mutual information neural estimation (MINE) to evaluate the secrecy capacity. Moreover, we leverage MINE to avoid end-to-end learning in AE-based FJ.	{""}	f	published	international				paper					https://ieeexplore.ieee.org/document/9120554	0		0				0	{0,0}	2019-10-07	publication	10.1109/WCNC45663.2020.9120554		{}	{""}	{""}						{"Information Technology (IT)","Scopus-indexed journals"}	f	2021-04-21 17:27:36.582958	2021-04-21 17:27:36.582958	Q3, Q4 (ISI)
32	article	A framework for assume-guarantee regression verification of evolving software.	This paper presents a framework for verifying evolving component-based software using assume-guarantee logic. The goal is to improve CDNF-based assumption generation method by having local weakest assumptions that can be used more effectively when verifying component-based software in the context of software evolution. For this purpose, we improve the technique for responding to membership queries when generating candidate assumptions. This technique is then integrated into a proposed backtracking algorithm to generate local weakest assumptions. These assumptions are effectively used in rechecking the evolving software by reducing time required for assumption regeneration within the proposed framework. The proposed framework can be applied to verify software that is continually evolving. An implemented tool and experimental results are presented to demonstrate the effectiveness and usefulness of the framework.	{""}	f	published											0		0				0	{0,0}	2020-07-01	completion			{}	{""}	{""}						{"Electronics and Computer Engineering","Information Technology (IT)"}	t	2021-05-09 10:26:05.62228	2021-05-09 10:26:05.62228	Q3, Q4 (ISI)
46	conference-workshop-item	On Improvement of Assume-Guarantee Verification Method for Timed Component-Based Software	The Assume-guarantee verification using TL* algorithm implemented in Learner is an important method to alleviate the state space explosion problem in model checking of timed systems, thanks to its divide and conquer strategy. This paper presents an improvement for TL* learning algorithm of Learner by removing the first phase from the verification process and starting learning assumption from λ. This improvement reduces the time complexity and covers a number of cases where assumptions exist while the original TL* algorithm cannot. Besides, this paper adds a kind of bound to the candidate query answering algorithm of Teacher for it to return “don't know” result and prevent Learner from running endlessly. We give some discussions related to both of original algorithms and the improved ones in the paper.\n	{""}	f	published	international	2018 10th International Conference on Knowledge and Systems Engineering (KSE)			paper						0		0				0	{0,0}	2018-12-13	completion			{}	{""}	{""}						{Communications,"Electronics and Computer Engineering","Information Technology (IT)"}	t	2021-05-09 15:56:08.682644	2021-05-09 15:56:08.682644	ISI/Scopus Conference Proceedings or Reputed Sponsors
45	article	On Implementation of the Improved Assume-Guarantee Verification Method for Timed Systems	The two-phase assume-guarantee verification method for timed systems using TL algorithm implemented in the learner has been known as a potential method to solve the problem of state space explosion in model checking thanks to its divide and conquer strategy. This paper presents three improvements to the verification method. First, we remove the untimed verification phase from the verification process. This removal reduces the time complexity of the verification process because of the great time complexity of this phase. Second, we introduce a maxbound to the equivalence queries answering algorithm implemented in the teacher which acts as a method for the teacher to return "don't know" results to the learner to prevent the verification process from many endless scenarios. Finally, we introduce a technique to analyze the counterexample received from the teacher and another one implemented in the equivalence queries answering algorithm which helps the teacher not return a counterexample that has been returned to the learner. This technique keeps the verification process from running forever in several circumstances. We give primitive experimental results for both two-phase assumption generation method and the improved one with some discussions in the paper.	{""}	f	submitted	international										0		0				0	{457,464}	2019-12-09	completion			{}	{""}	{""}						{Communications,"Electronics and Computer Engineering","Information Technology (IT)"}	t	2021-05-09 15:53:42.59741	2021-05-09 15:53:42.59741	Q3, Q4 (ISI)
44	conference-workshop-item	Improvements of Directed Automated Random Testing in Test Data Generation for C++ Projects	This paper improves the breadth-first search strategy in directed automated random testing (DART) to generate a fewer number of test data while gaining higher branch coverage, namely Static DART or SDART for short. In addition, the paper extends the test data compilation mechanism in DART, which currently only supports the projects written in C, to generate test data for C++ projects. The main idea of SDART is when it is less likely to increase code coverage with the current path selection strategies, the static test data generation will be applied with the expectation that more branches are covered earlier. Furthermore, in order to extend the test data compilation of DART for C++ context, the paper suggests a general test driver technique for C++ which supports various types of parameters including basic types, arrays, pointers, and derived types. Currently, an experimental tool has been implemented based on the proposal in order to demonstrate its efficacy in practice. The results have shown that SDART achieves higher branch coverage with a fewer number of test data in comparison with that of DART in practice.	{""}	f		domestic				paper					https://doi.org/10.1142/S0218194019500402	0		0				0	{0,0}	2019-06-09	publication			{}	{""}	{""}						{"Information Technology (IT)"}	t	2021-05-09 15:50:27.886777	2021-05-09 15:50:27.886777	ISI/Scopus Conference Proceedings or Reputed Sponsors
33	conference-workshop-item	Practical approach to access the impact of global variables on program parallelism.	Global variables may have a significant impact on preventing programs from automatic parallelism. This paper introduces a practical approach to measure the effect of global variables on program parallelism. First, we conduct static data dependence analysis among program variables and represent such dependencies by a Variable Dependence Graph. Then, we analyze this graph for measuring and identifying which global variables have a significant impact on program parallelism. To evaluate this approach, we conduct experiments on 20 benchmark programs and an industrial application. The experimental results show that half of the studied programs contain large impact variables which may be the cause of preventing programs from parallel execution.	{""}	f	published	international	International Conference on Advanced Computing and Applications (ACOMP) 			paper	documentationMonoType					0	 2020 International Conference on Advanced Computing and Applications (ACOMP)	0				0	{0,0}	2020-11-25	publication			{}	{""}	{""}						{Communications,"Electronics and Computer Engineering","Information Technology (IT)"}	t	2021-05-09 10:33:05.902744	2021-05-09 10:33:05.902744	ISI/Scopus Conference Proceedings or Reputed Sponsors
50	article	A Correlation-aware Negotiation Approach for Service Composition	Composing existing services to create new services has been considered as an important activity of developing service-oriented architecture systems. The increment of services that provide the same functionality but different qualities leads to the complexity in finding the best solution for a composite service. In a heterogeneous and dynamic environment, QoS negotiation provides a flexible means for choosing suitable atomic services for service compositions. However, most proposed negotiation approaches assume that services are independent of others in terms of quality. Consequently, these negotiation approaches are not able to handle the correlation factors among services. This paper presents a flexible correlation-aware negotiation approach for service compositions. In our approach, the service correlations are considered as factors affecting the choice of concrete services. The effectiveness of the approach is demonstrated via experiments.	{""}	f	published	international									https://doi.org/10.1145/2833258.2833264	0		0				0	{210,216}	2015-12-24	publication			{}	{""}	{""}						{"Information Technology (IT)"}	t	2021-05-09 16:11:14.047843	2021-05-09 16:11:14.047843	
49	conference-workshop-item	On Implementation of the Assumption Generation Method for Component-Based Software Verification	\nThe assume-guarantee verification has been recognized as a promising method for solving the state space explosion in modular model checking of component-based software. However, the counterexample analysis technique used in this method has huge complexity and the computational cost for generating assumptions is very high. As a result, the method is difficult to be applied in practice. Therefore, this paper presents two improvements of the assume-guarantee verification method in order to solve the above problems. The first one is a counterexample analysis method that is simple to implement but effective enough to prevent the verification process from infinite loops when considering the last action of counterexample as suffix in implementation. This is done by finding a suffix that can make the observation table not closed when being added to the suffix set of the table and use that suffix for the learning process. The second one is a reduction of the number of membership queries to be asked to teacher when learning assumptions. This results in a significantly faster speed in generating assumption than that of the original algorithm. An implemented tool and experimental results are also described to show the effectiveness of the improvements.	{""}	f	published	international				lecture						0		0				0	{0,0}	2017-03-23				{}	{""}	{""}						{"Information Technology (IT)","Scopus-indexed journals"}	t	2021-05-09 16:05:30.056437	2021-05-09 16:05:30.056437	ISI/Scopus Conference Proceedings or Reputed Sponsors
48	conference-workshop-item	A Method for Automated Test Cases Generation from UML Models with String Constraints	This paper proposes an automated test cases generation method from sequence diagrams and class diagrams with string constraints. The method supports UML 2.0 sequence diagrams including twelve combined fragments. An algorithm for generating test scenarios are developed to avoid test paths explosion without having data sharing points of threads in parallel fragments or weak sequencing fragments. Test data are also generated with solving constraints of string variables. We standardize string constraints and equations at the boundary of variables that are input formula of Z3-str solver. Comparing with the current approach of the solver, some preprocessing rules are extended for other operations such as charAt, lastindexOf, trim, startsWith and endsWith. If a result of the Z3-str is SAT, test data of each test scenario are generated to satisfy the constraints with boundary coverage. A tool is implemented to support the proposed method, and some experiments are also presented to illustrate the effectiveness of the tool.	{""}	f	published	international				paper						0		0				0	{0,0}	2017-03-23	completion			{}	{""}	{""}						{Communications,"Electronics and Computer Engineering","Information Technology (IT)"}	t	2021-05-09 16:02:19.241193	2021-05-09 16:02:19.241193	National Conference Proceedings Having ISBN
51	conference-workshop-item	An Efficient Method for Automated Generating Models of Component-Based Software	This paper proposes an efficient method for automated generating models of component-based software. This method accepts regular expressions that describe behaviors of software components. The proposed method uses the CNNFA algorithm to parse the regular expressions in order to generate corresponding models. This method can generate minimal accurate models of the software components. A tool is implemented and applied for some typical systems to show the efficiency of this method. The obtained experimental results show that this method is faster than existing methods. The generated models play an important role in making such model-based approaches as model checking and model-based testing more feasible in practice.	{""}	f	published	international				paper						0		0				0	{0,0}	2014-07-09	completion			{}	{""}	{""}						{"Information Technology (IT)"}	t	2021-05-09 16:17:05.399626	2021-05-09 16:17:05.399626	ISI/Scopus Conference Proceedings or Reputed Sponsors
47	article	A method for Automated User Interface Testing of Windows-based Applications	This paper proposes a method for automated user interface testing of Windows-based applications to increase the accuracy in identifying the target widgets or executing several interactions. The key idea of this method is to generate new test scenarios from widgets and test specification where widgets are extracted during the execution of the application and test specification is generated by combining the interactions of widgets. Furthermore, the paper contributes some techniques to detect hidden widgets which considering as one of the most challenging problems in user interface testing. Currently, a supporting tool has been implemented and tested with several industrial projects. The details of the experimental results will be presented and discussed.	{""}	f	published	international									https://doi.org/10.1145/3287921.3287939	0		0				0	{337,343}	2018-12-14				{}	{""}	{""}						{Communications,"Information Technology (IT)"}	t	2021-05-09 15:59:34.609617	2021-05-09 15:59:34.609617	Q1, Q2 (ISI)
21	article	On Locally Strongest Assumption Generation Method for Component-Based Software Verification	Assume-guarantee reasoning, a well-known approach in component-based software (CBS) verification, is in fact a language containment problem whose computational cost depends on the sizes of languages of the software components under checking and the assumption to be generated. Therefore, the smaller language assumptions, the more computational cost we can reduce in software verification. Moreover, strong assumptions are more important in CBS verification in the context of software evolution because they can be reused many times in the verification process. For this reason, this paper presents a method for generating locally strongest assumptions with locally smallest languages during CBS verification. The key idea of this method is to create a variant technique for answering membership queries of the Teacher when responding to the Learner in the L ∗–based assumption learning process. This variant technique is then integrated into an algorithm in order to generate locally strongest assumptions. These assumptions will effectively reduce the computational cost when verifying CBS, especially for large–scale and evolving ones. The correctness proof, experimental results, and some discussions about the proposed method are also presented.	{""}	f	published	domestic	Computer Science and Communication Engineering							VNU Journal of Science	https://doi.org/10.25073/2588-1086/vnucsce.209	34		0				2	{0,0}	2018-12-25		https://doi.org/10.25073/2588-1086/vnucsce.209		{}	{"Vietnam National Foundation for Science and Technology Development (NAFOSTED)"}	{102.03-2015.25}						{"Electronics and Computer Engineering","Information Technology (IT)","Civil Engineering"}	t	2021-04-23 00:55:39.247312	2021-04-23 00:55:39.247312	VNU Journals
2	conference-workshop-item	A minimized assumption generation method for component-based software verification	An assume-guarantee verification method has been recognized as a promising approach to verify component-based software with model checking. The method is not only fitted to component-based software but also has a potential to solve the state space explosion problem in model checking. This method allows us to decompose a verification target into components so that we can model check each of them separately. In this method, assumptions which are environments of the components are generated. The number of states of the assumptions should be minimized because the computational cost of model checking is influenced by that number. Thus, we propose a method for generating minimal assumptions for the assume-guarantee verification of component-based software. The key idea of this method is finding the minimal assumptions in the search spaces of the candidate assumptions. These assumptions are seen as the environments needed for the components to satisfy a property and for the rest of the system to be satisfied. The minimal assumptions generated by the proposed method can be used to recheck the whole system at much lower computational cost. We have implemented a tool for generating the minimal assumptions. Experimental results are also presented and discussed.	{""}	f	published	international	International Colloquium on Theoretical Aspects of Computing			paper					https://link.springer.com/chapter/10.1007/978-3-642-03466-4_18	0		0				0	{0,0}	2009-08-16	publication	10.1007/978-3-642-03466-4_18		{}	{""}	{""}						{"Electronics and Computer Engineering","ISI-indexed journals","Information Technology (IT)"}	t	2021-04-21 13:38:34.361366	2021-04-21 13:38:34.361366	English Peer-reviewed Conference Proceedings
1	article	Modular conformance testing and assume-guarantee verification for evolving component-based software	This paper proposes a framework for modular verification of evolving component-based software. This framework includes two stages: modular conformance testing for updating inaccurate models of the evolved components and modular verification for evolving component-based software. When a component is evolved after adapting some refinements, the proposed framework focuses on this component and its model in order to update the model and recheck the whole evolved system. The framework also reuses the previous verification results and the previous models of the evolved components to reduce the number of steps required in the model update and modular verification processes. An implementation and some experimental results are presented.	{""}	f	published	international	IEICE Transactions on Fundamentals of Electronics, Communications and Computer Sciences						1745-1337	The Institute of Electronics, Information and Communication Engineers	https://ieeexplore.ieee.org/document/4724581	92		0				11	{2772,2780}	2009-11-01	publication	10.1587/transfun.E92.A.2772		{}	{" JAIST 21 Century COE"}	{"Verifiable and Evolvable e-Society"}						{"Electronics and Computer Engineering","ISI-indexed journals","Information Technology (IT)","Scopus-indexed journals"}	t	2021-04-21 13:17:45.435283	2021-04-21 13:17:45.435283	Q3, Q4 (ISI)
4	conference-workshop-item	An assume-guarantee model checker for component-based systems	This paper introduces an assume-guarantee model checker, named AGMC, for verifying correctness of designs of component-based systems. Given UML 2.0 sequence diagrams that describe behaviors of the system components and a required property, AGMC generates accurate models of the components represented by labeled transition systems (LTSs) automatically. AGMC then model checks that whether the system satisfies the property by using the assume-guarantee verification method. AGMC has been implemented and tested by applying some typical component-based systems. The implemented AGMC is not only useful to verify component-based systems in practice but also has a potential to solve the state space explosion problem in model checking.	{""}	f	published	international	RIVF International Conference on Computing & Communication Technologies - Research, Innovation, and Vision for Future			paper					https://ieeexplore.ieee.org/abstract/document/6719860/	0		0				0	{0,0}	2013-11-10	publication	10.1109/RIVF.2013.6719860		{}	{"Vietnam National University, Hanoi (VNU)"}	{QG.12.50}						{Communications,"Electronics and Computer Engineering","ISI-indexed journals","Information Technology (IT)"}	t	2021-04-21 17:15:22.781154	2021-04-21 17:15:22.781154	English Peer-reviewed Conference Proceedings
23	conference-workshop-item	Learning to classify short and sparse text & web with hidden topics from large-scale data collections	This paper presents a general framework for building classifiers that deal with short and sparse text & Web segments by making the most of hidden topics discovered from largescale data collections. The main motivation of this work is that many classification tasks working with short segments of text & Web, such as search snippets, forum & chat messages, blog & news feeds, product reviews, and book & movie summaries, fail to achieve high accuracy due to the data sparseness. We, therefore, come up with an idea of gaining external knowledge to make the data more related as well as expand the coverage of classifiers to handle future data better. The underlying idea of the framework is that for each classification task, we collect a large-scale external data collection called “universal dataset”, and then build a classifier on both a (small) set of labeled training data and a rich set of hidden topics discovered from that data collection. The framework is general enough to be applied to different data domains and genres ranging from Web search results to medical text. We did a careful evaluation on several hundred megabytes of Wikipedia (30M words) and MEDLINE (18M words) with two tasks: “Web search domain disambiguation” and “disease categorization for medical text”, and achieved significant quality enhancement.	{""}	f	published	international	Proceedings of the 17th international conference on World Wide Web			paper					https://dl.acm.org/doi/pdf/10.1145/1367497.1367510	0		0				0	{0,0}	2008-04-25	publication	10.1145/1367497.1367510		{}	{"Japan Society for the Promotion of Science (JSPS)."}	{No.P06366}						{Communications,"ISI-indexed journals","Information Technology (IT)","Scopus-indexed journals"}	t	2021-04-23 01:24:04.852332	2021-04-23 01:24:04.852332	ISI/Scopus Conference Proceedings or Reputed Sponsors
52	conference-workshop-item	On the Compliance of Access Control Policies in Web Applications	Model-View-Controller (MVC) architecture has commonly used in the implementation of web applications. These systems often incorporate security policies to ensure their reliability. Role-based access control (RBAC) is one of the effective solutions for reducing resources access violations of a system. This paper introduces an approach to check the compliance of a web application under MVC architecture with its RBAC specification. By investigating the system architecture and source code analysis, our approach conducts with extracting a list of resources access permissions, constructing a resources exploitation graph and organizing an access control matrix according to roles of a web application. The approach aims at checking two violation cases of web applications: (i) the presence of unspecified access rules and (ii) the absence of specified access rules. We illustrate the proposed approach by a case study of web based medical records management system.	{""}	f	published	international	International Conference on Nature of Computation and Communication			paper						0		0				0	{0,0}	2018-12-30				{}	{""}	{""}						{"Information Technology (IT)"}	t	2021-05-09 18:05:38.337719	2021-05-09 18:05:38.337719	ISI/Scopus Conference Proceedings or Reputed Sponsors
43	conference-workshop-item	Generate Test Data from C/C++ Source Code using Weighted CFG and Boundary Values	This paper presents two test data automatic generation methods which are based on weighted control flow graph (named WCFT) and boundary values of input parameters (named BVTG). Firstly, WCFT method generates a CFG from a given unit function, updates weight for it, then generates test data from the greatest weight test paths. In the meantime, WCFT can And dead code that can be used for automatic source code errors fix. Secondly, BVTG method generates test data from boundary values of input parameters of the given unit function. The combination of the two generated test data sets from these two methods will improve the error detection ability while maintaining a high code coverage. An implemented tool (named WCFT4Cpp) and experimental results are also presented to show the effectiveness of the two proposed methods in both time required to generate test data and error detection ability.	{TOSHIBA}	f	published	international	2th International Conference on Knowledge and Systems Engineering (KSE)								https://ieeexplore.ieee.org/document/9287629	0		0				0	{0,0}	2020-11-14	publication	10.1109/KSE50997.2020.9287629		{}	{""}	{""}						{"Engineering Physics","Information Technology (IT)"}	t	2021-05-09 11:56:53.434875	2021-05-09 11:56:53.434875	ISI/Scopus Conference Proceedings or Reputed Sponsors
\.


--
-- Data for Name: publication_creator; Type: TABLE DATA; Schema: public; Owner: suongsun
--

COPY public.publication_creator (publication_id, creator_email, author_order, db_created_on, db_updated_on) FROM stdin;
5	kangms@kaist.ac.uk	4	2021-04-29 19:12:11.587523	2021-04-29 19:12:11.587523
5	muoitd@comp.nus.edu.sg	0	2021-04-29 19:12:11.587423	2021-04-29 19:12:11.587423
5	gijun@korea.edu	2	2021-04-29 19:12:11.58765	2021-04-29 19:12:11.58765
5	inho@yonsei.ac.kr	1	2021-04-29 19:12:11.58778	2021-04-29 19:12:11.58778
5	anh.vu@cst.cam.ac.uk	3	2021-04-29 19:12:11.588179	2021-04-29 19:12:11.588179
4	duonghn@vnu.edu.vn	0	2021-04-29 19:12:29.797411	2021-04-29 19:12:29.797411
4	trinhlk@vnu.edu.vn	1	2021-04-29 19:12:29.797523	2021-04-29 19:12:29.797523
4	hungpn@vnu.edu.vn	2	2021-04-29 19:12:29.797763	2021-04-29 19:12:29.797763
3	daovt@vnu.edu.vn	0	2021-04-29 19:12:54.730434	2021-04-29 19:12:54.730434
3	hungpn@vnu.edu.vn	1	2021-04-29 19:12:54.730731	2021-04-29 19:12:54.730731
3	hanv@vnu.edu.vn	2	2021-04-29 19:12:54.730609	2021-04-29 19:12:54.730609
2	hungpn@vnu.edu.vn	0	2021-04-29 19:13:09.927261	2021-04-29 19:13:09.927261
2	aoki@jaist.ac.jp	1	2021-04-29 19:13:09.927398	2021-04-29 19:13:09.927398
2	katayama@jaist.ac.jp	2	2021-04-29 19:13:09.927569	2021-04-29 19:13:09.927569
1	hungpn@vnu.edu.vn	0	2021-04-29 19:13:27.623857	2021-04-29 19:13:27.623857
1	aoki@jaist.ac.jp	1	2021-04-29 19:13:27.624416	2021-04-29 19:13:27.624416
1	katayama@jaist.ac.jp	2	2021-04-29 19:13:27.624214	2021-04-29 19:13:27.624214
23	hieupx@vnu.edu.vn	0	2021-04-29 19:26:58.834345	2021-04-29 19:26:58.834345
23	susumu@tokoku.ac.jp	2	2021-04-29 19:26:58.834719	2021-04-29 19:26:58.834719
23	minhnl@jaist.ac.jp	1	2021-04-29 19:26:58.835345	2021-04-29 19:26:58.835345
25	hanv@vnu.edu.vn	1	2021-04-29 19:30:37.293985	2021-04-29 19:30:37.293985
25	anhnv@vnu.edu.vn	0	2021-04-29 19:30:37.294448	2021-04-29 19:30:37.294448
25	damhs@vnu.edu.vn	2	2021-04-29 19:30:37.295379	2021-04-29 19:30:37.295379
22	hungpn@vnu.edu.vn	1	2021-04-29 20:25:42.277332	2021-04-29 20:25:42.277332
22	anhnd@vnu.edu.vn	0	2021-04-29 20:25:42.277437	2021-04-29 20:25:42.277437
21	vietth@vnu.edu.vn	0	2021-04-29 20:27:08.755101	2021-04-29 20:27:08.755101
21	hungpn@vnu.edu.vn	1	2021-04-29 20:27:08.755299	2021-04-29 20:27:08.755299
19	cuonglb@vnu.edu.vn	0	2021-04-29 20:27:43.464872	2021-04-29 20:27:43.464872
19	hungpn@vnu.edu.vn	1	2021-04-29 20:27:43.465219	2021-04-29 20:27:43.465219
27	hungdv@vnu.edu.vn	2	2021-05-01 10:16:31.112649	2021-05-01 10:16:31.112649
27	hoangta@vnu.edu.vn	1	2021-05-01 10:16:31.112066	2021-05-01 10:16:31.112066
27	hungpn@vnu.edu.vn	0	2021-05-01 10:16:31.112408	2021-05-01 10:16:31.112408
26	hungpn@vnu.edu.vn	0	2021-04-29 19:07:06.186133	2021-04-29 19:07:06.186133
26	hienda@vnu.edu.vn	1	2021-04-29 19:07:06.187049	2021-04-29 19:07:06.187049
26	nguyetna@vnu.edu.vn	2	2021-04-29 19:07:06.187255	2021-04-29 19:07:06.187255
26	hanv@vnu.edu.vn	3	2021-04-29 19:07:06.187354	2021-04-29 19:07:06.187354
24	kaothanthong@tohoku.ac.jp	1	2021-04-29 19:07:54.796221	2021-04-29 19:07:54.796221
24	tuct@vnu.edu.vn	0	2021-04-29 19:07:54.796473	2021-04-29 19:07:54.796473
24	hieupx@vnu.edu.vn	2	2021-04-29 19:07:54.796672	2021-04-29 19:07:54.796672
24	tokuyama@jaist.ac.jp	3	2021-04-29 19:07:54.797105	2021-04-29 19:07:54.797105
20	anh.vu@cst.cam.ac.uk	1	2021-04-29 19:09:08.717236	2021-04-29 19:09:08.717236
20	hieupx@vnu.edu.vn	3	2021-04-29 19:09:08.717603	2021-04-29 19:09:08.717603
20	minhld@vnu.edu.vn	2	2021-04-29 19:09:08.717909	2021-04-29 19:09:08.717909
20	giapnv@vnu.edu.vn	0	2021-04-29 19:09:08.718701	2021-04-29 19:09:08.718701
18	anhnd@vnu.edu.vn	0	2021-04-29 19:09:59.783624	2021-04-29 19:09:59.783624
18	hungpn@vnu.edu.vn	1	2021-04-29 19:09:59.785015	2021-04-29 19:09:59.785015
18	hanv@vnu.edu.vn	2	2021-04-29 19:09:59.785268	2021-04-29 19:09:59.785268
10	thangnt@vnu.edu.vn	1	2021-04-29 19:10:24.818547	2021-04-29 19:10:24.818547
10	hungpn@vnu.edu.vn	0	2021-04-29 19:10:24.818424	2021-04-29 19:10:24.818424
10	katayama@jaist.ac.jp	2	2021-04-29 19:10:24.819436	2021-04-29 19:10:24.819436
9	aoki@jaist.ac.jp	2	2021-04-29 19:10:46.050059	2021-04-29 19:10:46.050059
9	hungpn@vnu.edu.vn	0	2021-04-29 19:10:46.049965	2021-04-29 19:10:46.049965
9	hanv@vnu.edu.vn	1	2021-04-29 19:10:46.050396	2021-04-29 19:10:46.050396
9	katayama@jaist.ac.jp	3	2021-04-29 19:10:46.050573	2021-04-29 19:10:46.050573
8	hanv@vnu.edu.vn	2	2021-05-02 11:18:51.938933	2021-05-02 11:18:51.938933
8	khoatv@vnu.edu.vn	0	2021-05-02 11:18:51.939554	2021-05-02 11:18:51.939554
8	trungnl@vnu.edu.vn	1	2021-05-02 11:18:51.941415	2021-05-02 11:18:51.941415
7	minhld@vnu.edu.vn	0	2021-05-02 11:29:58.929757	2021-05-02 11:29:58.929757
7	hanhdd@vnu.edu.vn	1	2021-05-02 11:29:58.93281	2021-05-02 11:29:58.93281
7	hanv@vnu.edu.vn	2	2021-05-02 11:29:58.93321	2021-05-02 11:29:58.93321
6	tuyentd@vnu.edu.vn	1	2021-05-02 11:51:15.146896	2021-05-02 11:51:15.146896
6	hanv@vnu.edu.vn	2	2021-05-02 11:51:15.14771	2021-05-02 11:51:15.14771
6	tuanbm@vnu.edu.vn	0	2021-05-02 11:51:15.239152	2021-05-02 11:51:15.239152
44	anhnd@vnu.edu.vn	0	2021-05-09 15:50:27.950109	2021-05-09 15:50:27.950109
44	hungpn@vnu.edu.vn	3	2021-05-09 15:50:27.951734	2021-05-09 15:50:27.951734
44	huongtn@vnu.edu.vn	1	2021-05-09 15:50:27.951734	2021-05-09 15:50:27.951734
44	hieuvd@vnu.edu.vn	2	2021-05-09 15:50:27.952576	2021-05-09 15:50:27.952576
45	quangtn@vnu.edu.vn	1	2021-05-09 15:53:42.68453	2021-05-09 15:53:42.68453
45	hungpn@vnu.edu.vn	2	2021-05-09 15:53:42.686544	2021-05-09 15:53:42.686544
45	hoangtv@vnu.edu.vn	0	2021-05-09 15:53:42.68674	2021-05-09 15:53:42.68674
46	hungpn@vnu.edu.vn	1	2021-05-09 15:56:08.726547	2021-05-09 15:56:08.726547
46	hoangtv@vnu.edu.vn	0	2021-05-09 15:56:08.733833	2021-05-09 15:56:08.733833
46	hungdv@vnu.edu.vn	2	2021-05-09 15:56:08.735017	2021-05-09 15:56:08.735017
47	duongtd@vnu.edu.vn	0	2021-05-09 15:59:34.655648	2021-05-09 15:59:34.655648
47	hungpn@vnu.edu.vn	1	2021-05-09 15:59:34.656216	2021-05-09 15:59:34.656216
47	tungnd@vnu.edu.vn	2	2021-05-09 15:59:34.677231	2021-05-09 15:59:34.677231
48	daovt@vnu.edu.vn	0	2021-05-09 16:02:19.307735	2021-05-09 16:02:19.307735
48	hungpn@vnu.edu.vn	1	2021-05-09 16:02:19.309353	2021-05-09 16:02:19.309353
48	hanv@vnu.edu.vn	2	2021-05-09 16:02:19.312243	2021-05-09 16:02:19.312243
49	hungpn@vnu.edu.vn	2	2021-05-09 16:05:30.090381	2021-05-09 16:05:30.090381
49	chill@vnu.edu.vn	0	2021-05-09 16:05:30.091284	2021-05-09 16:05:30.091284
49	hoangtv@vnu.edu.vn	1	2021-05-09 16:05:30.095478	2021-05-09 16:05:30.095478
50	hungpn@vnu.edu.vn	2	2021-05-09 16:11:14.086732	2021-05-09 16:11:14.086732
50	hieuvd@vnu.edu.vn	1	2021-05-09 16:11:14.088502	2021-05-09 16:11:14.088502
50	sonnv@vnu.edu.vn	0	2021-05-09 16:11:14.089918	2021-05-09 16:11:14.089918
51	chill@vnu.edu.vn	1	2021-05-09 16:17:38.342294	2021-05-09 16:17:38.342294
51	hungpn@vnu.edu.vn	3	2021-05-09 16:17:38.342404	2021-05-09 16:17:38.342404
51	trungnq@vnu.edu.vn	2	2021-05-09 16:17:38.343532	2021-05-09 16:17:38.343532
51	hoangtv@vnu.edu.vn	0	2021-05-09 16:17:38.342931	2021-05-09 16:17:38.342931
52	khanhtv@vnu.edu.vn	2	2021-05-09 18:05:38.380808	2021-05-09 18:05:38.380808
52	thuantn@vnu.edu.vn	3	2021-05-09 18:05:38.382452	2021-05-09 18:05:38.382452
52	hieuvd@vnu.edu.vn	1	2021-05-09 18:05:38.382805	2021-05-09 18:05:38.382805
52	nhanlt@vnu.edu.vn	0	2021-05-09 18:05:38.38286	2021-05-09 18:05:38.38286
33	hieuvd@vnu.edu.vn	4	2021-05-09 19:00:29.053615	2021-05-09 19:00:29.053615
33	huen@vnu.edu.vn	1	2021-05-09 19:00:29.053664	2021-05-09 19:00:29.053664
33	trangnt@vnu.edu.vn	0	2021-05-09 19:00:29.05297	2021-05-09 19:00:29.05297
33	cuongbq@vnu.edu.vn	2	2021-05-09 19:00:29.063403	2021-05-09 19:00:29.063403
33	hungpn@vnu.edu.vn	3	2021-05-09 19:00:29.064988	2021-05-09 19:00:29.064988
43	khadm@vnu.edu.vn	1	2021-05-09 19:04:27.463152	2021-05-09 19:04:27.463152
43	huongtn@vnu.edu.vn	0	2021-05-09 19:04:27.466546	2021-05-09 19:04:27.466546
43	hoangtv@vnu.edu.vn	2	2021-05-09 19:04:27.466932	2021-05-09 19:04:27.466932
43	hungpn@vnu.edu.vn	3	2021-05-09 19:04:27.467121	2021-05-09 19:04:27.467121
32	hoangtv@vnu.edu.vn	0	2021-05-09 19:05:14.971156	2021-05-09 19:05:14.971156
32	hungpn@vnu.edu.vn	1	2021-05-09 19:05:14.972671	2021-05-09 19:05:14.972671
32	hanv@vnu.edu.vn	2	2021-05-09 19:05:15.011639	2021-05-09 19:05:15.011639
\.


--
-- Data for Name: publication_division; Type: TABLE DATA; Schema: public; Owner: suongsun
--

COPY public.publication_division (publication_id, division_name, db_created_on, db_updated_on) FROM stdin;
19	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 20:27:43.364467	2021-04-29 20:27:43.364467
10	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 19:10:24.808591	2021-04-29 19:10:24.808591
10	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 19:10:24.81082	2021-04-29 19:10:24.81082
10	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 19:10:24.811701	2021-04-29 19:10:24.811701
10	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 19:10:24.813542	2021-04-29 19:10:24.813542
19	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 20:27:43.366705	2021-04-29 20:27:43.366705
19	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 20:27:43.39062	2021-04-29 20:27:43.39062
19	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 20:27:43.3925	2021-04-29 20:27:43.3925
19	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-04-29 20:27:43.394097	2021-04-29 20:27:43.394097
19	SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-04-29 20:27:43.461891	2021-04-29 20:27:43.461891
10	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-04-29 19:10:24.815606	2021-04-29 19:10:24.815606
10	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 19:10:24.809387	2021-04-29 19:10:24.809387
10	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 19:10:24.810559	2021-04-29 19:10:24.810559
10	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 19:10:24.811575	2021-04-29 19:10:24.811575
10	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 19:10:24.812474	2021-04-29 19:10:24.812474
10	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-04-29 19:10:24.814916	2021-04-29 19:10:24.814916
10	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 19:10:24.81598	2021-04-29 19:10:24.81598
19	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 20:27:43.364605	2021-04-29 20:27:43.364605
19	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 20:27:43.367046	2021-04-29 20:27:43.367046
19	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 20:27:43.390949	2021-04-29 20:27:43.390949
19	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-04-29 20:27:43.393817	2021-04-29 20:27:43.393817
19	SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không	2021-04-29 20:27:43.462184	2021-04-29 20:27:43.462184
26	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 19:07:06.172381	2021-04-29 19:07:06.172381
26	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 19:07:06.172817	2021-04-29 19:07:06.172817
26	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 19:07:06.172833	2021-04-29 19:07:06.172833
26	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 19:07:06.175507	2021-04-29 19:07:06.175507
26	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 19:07:06.175889	2021-04-29 19:07:06.175889
26	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 19:07:06.175924	2021-04-29 19:07:06.175924
26	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 19:07:06.176033	2021-04-29 19:07:06.176033
26	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 19:07:06.177266	2021-04-29 19:07:06.177266
26	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 19:07:06.177535	2021-04-29 19:07:06.177535
26	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 19:07:06.17752	2021-04-29 19:07:06.17752
26	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 19:07:06.177751	2021-04-29 19:07:06.177751
26	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 19:07:06.1782	2021-04-29 19:07:06.1782
26	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 19:07:06.178469	2021-04-29 19:07:06.178469
26	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 19:07:06.1785	2021-04-29 19:07:06.1785
26	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 19:07:06.178723	2021-04-29 19:07:06.178723
26	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 19:07:06.179111	2021-04-29 19:07:06.179111
26	FET: Phòng thí nghiệm Tín hiệu và Hệ thống	2021-04-29 19:07:06.179194	2021-04-29 19:07:06.179194
26	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-04-29 19:07:06.180379	2021-04-29 19:07:06.180379
26	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 19:07:06.180761	2021-04-29 19:07:06.180761
26	SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-04-29 19:07:06.18097	2021-04-29 19:07:06.18097
26	Viện tiến tiến về Kỹ thuật và Công nghệ (AVITECH)	2021-04-29 19:07:06.181404	2021-04-29 19:07:06.181404
26	Phòng thí nghiệm trọng điểm Các Hệ Thống Tích Hợp Thông Minh (SISLAB)	2021-04-29 19:07:06.182407	2021-04-29 19:07:06.182407
19	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 20:27:43.364981	2021-04-29 20:27:43.364981
19	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 20:27:43.366248	2021-04-29 20:27:43.366248
19	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 20:27:43.390308	2021-04-29 20:27:43.390308
10	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 19:10:24.809421	2021-04-29 19:10:24.809421
10	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 19:10:24.811287	2021-04-29 19:10:24.811287
10	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 19:10:24.811972	2021-04-29 19:10:24.811972
10	FEPN: Bộ môn Công Nghệ Quang Tử	2021-04-29 19:10:24.81491	2021-04-29 19:10:24.81491
19	FEPN: Bộ môn Công Nghệ Quang Tử	2021-04-29 20:27:43.392104	2021-04-29 20:27:43.392104
19	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-04-29 20:27:43.461427	2021-04-29 20:27:43.461427
19	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 20:27:43.365152	2021-04-29 20:27:43.365152
10	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 19:10:24.809735	2021-04-29 19:10:24.809735
10	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 19:10:24.812228	2021-04-29 19:10:24.812228
10	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 19:10:24.815282	2021-04-29 19:10:24.815282
19	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 20:27:43.389953	2021-04-29 20:27:43.389953
19	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-04-29 20:27:43.392305	2021-04-29 20:27:43.392305
19	Viện Công Nghệ Hàng Không Vũ Trụ (SAE)	2021-04-29 20:27:43.461635	2021-04-29 20:27:43.461635
19	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 20:27:43.365312	2021-04-29 20:27:43.365312
24	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 19:07:54.785862	2021-04-29 19:07:54.785862
24	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 19:07:54.786908	2021-04-29 19:07:54.786908
24	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 19:07:54.788945	2021-04-29 19:07:54.788945
24	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 19:07:54.790187	2021-04-29 19:07:54.790187
24	FEPN: Bộ môn Công Nghệ Quang Tử	2021-04-29 19:07:54.791325	2021-04-29 19:07:54.791325
24	Viện Công Nghệ Hàng Không Vũ Trụ (SAE)	2021-04-29 19:07:54.792864	2021-04-29 19:07:54.792864
24	Bộ môn Công Nghệ Xây Dựng - Giao Thông (CET)	2021-04-29 19:07:54.79367	2021-04-29 19:07:54.79367
10	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 19:10:24.810297	2021-04-29 19:10:24.810297
10	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 19:10:24.813213	2021-04-29 19:10:24.813213
10	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-04-29 19:10:24.815601	2021-04-29 19:10:24.815601
9	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 19:10:46.041569	2021-04-29 19:10:46.041569
9	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 19:10:46.04328	2021-04-29 19:10:46.04328
9	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 19:10:46.044781	2021-04-29 19:10:46.044781
9	FEPN: Bộ môn Công Nghệ Quang Tử	2021-04-29 19:10:46.045975	2021-04-29 19:10:46.045975
9	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 19:10:46.046801	2021-04-29 19:10:46.046801
9	Viện Công Nghệ Hàng Không Vũ Trụ (SAE)	2021-04-29 19:10:46.047721	2021-04-29 19:10:46.047721
19	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 20:27:43.367247	2021-04-29 20:27:43.367247
19	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 20:27:43.389599	2021-04-29 20:27:43.389599
19	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 20:27:43.391857	2021-04-29 20:27:43.391857
19	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 20:27:43.461136	2021-04-29 20:27:43.461136
19	SAE: Bộ môn Khoa Học Dữ Liệu Không Gian	2021-04-29 20:27:43.462916	2021-04-29 20:27:43.462916
27	Khoa Công Nghệ Thông Tin (FIT)	2021-05-01 10:16:31.101167	2021-05-01 10:16:31.101167
9	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 19:10:46.041109	2021-04-29 19:10:46.041109
9	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 19:10:46.043637	2021-04-29 19:10:46.043637
9	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 19:10:46.044975	2021-04-29 19:10:46.044975
9	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-04-29 19:10:46.046278	2021-04-29 19:10:46.046278
9	SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-04-29 19:10:46.047474	2021-04-29 19:10:46.047474
27	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-01 10:16:31.101899	2021-05-01 10:16:31.101899
27	FET: Bộ môn Thông tin Vô tuyến	2021-05-01 10:16:31.102433	2021-05-01 10:16:31.102433
27	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-05-01 10:16:31.102676	2021-05-01 10:16:31.102676
27	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-05-01 10:16:31.102838	2021-05-01 10:16:31.102838
27	SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không	2021-05-01 10:16:31.108942	2021-05-01 10:16:31.108942
27	Bộ môn Công Nghệ Xây Dựng - Giao Thông (CET)	2021-05-01 10:16:31.110815	2021-05-01 10:16:31.110815
24	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 19:07:54.785906	2021-04-29 19:07:54.785906
24	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 19:07:54.788537	2021-04-29 19:07:54.788537
24	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 19:07:54.789722	2021-04-29 19:07:54.789722
24	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-04-29 19:07:54.791413	2021-04-29 19:07:54.791413
24	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-04-29 19:07:54.792703	2021-04-29 19:07:54.792703
9	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 19:10:46.041398	2021-04-29 19:10:46.041398
9	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 19:10:46.043964	2021-04-29 19:10:46.043964
9	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 19:10:46.045111	2021-04-29 19:10:46.045111
9	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 19:10:46.04618	2021-04-29 19:10:46.04618
9	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-04-29 19:10:46.047059	2021-04-29 19:10:46.047059
9	SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không	2021-04-29 19:10:46.047966	2021-04-29 19:10:46.047966
24	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 19:07:54.786374	2021-04-29 19:07:54.786374
24	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 19:07:54.789441	2021-04-29 19:07:54.789441
24	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 19:07:54.791079	2021-04-29 19:07:54.791079
24	FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-04-29 19:07:54.791932	2021-04-29 19:07:54.791932
24	SAE: Bộ môn Khoa Học Dữ Liệu Không Gian	2021-04-29 19:07:54.79405	2021-04-29 19:07:54.79405
9	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 19:10:46.041459	2021-04-29 19:10:46.041459
9	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 19:10:46.044204	2021-04-29 19:10:46.044204
9	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 19:10:46.045362	2021-04-29 19:10:46.045362
9	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-04-29 19:10:46.046591	2021-04-29 19:10:46.046591
9	SAE: Bộ môn Khoa Học Dữ Liệu Không Gian	2021-04-29 19:10:46.047781	2021-04-29 19:10:46.047781
24	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 19:07:54.786344	2021-04-29 19:07:54.786344
24	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 19:07:54.789188	2021-04-29 19:07:54.789188
24	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-04-29 19:07:54.790449	2021-04-29 19:07:54.790449
24	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 19:07:54.791713	2021-04-29 19:07:54.791713
24	SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-04-29 19:07:54.793429	2021-04-29 19:07:54.793429
9	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 19:10:46.042067	2021-04-29 19:10:46.042067
9	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 19:10:46.044485	2021-04-29 19:10:46.044485
9	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 19:10:46.045941	2021-04-29 19:10:46.045941
9	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-04-29 19:10:46.047364	2021-04-29 19:10:46.047364
24	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 19:07:54.786534	2021-04-29 19:07:54.786534
24	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 19:07:54.789337	2021-04-29 19:07:54.789337
24	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 19:07:54.79042	2021-04-29 19:07:54.79042
24	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 19:07:54.791739	2021-04-29 19:07:54.791739
24	SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không	2021-04-29 19:07:54.793054	2021-04-29 19:07:54.793054
5	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 19:12:11.579226	2021-04-29 19:12:11.579226
5	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 19:12:11.581514	2021-04-29 19:12:11.581514
5	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 19:12:11.58207	2021-04-29 19:12:11.58207
5	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 19:12:11.583181	2021-04-29 19:12:11.583181
5	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 19:12:11.583841	2021-04-29 19:12:11.583841
5	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-04-29 19:12:11.584806	2021-04-29 19:12:11.584806
20	Khoa Điện Tử - Viễn Thông (FET)	2021-04-29 19:09:08.708889	2021-04-29 19:09:08.708889
20	FET: Phòng thí nghiệm Tín hiệu và Hệ thống	2021-04-29 19:09:08.71245	2021-04-29 19:09:08.71245
20	SAE: Bộ môn Khoa Học Dữ Liệu Không Gian	2021-04-29 19:09:08.713489	2021-04-29 19:09:08.713489
5	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 19:12:11.578853	2021-04-29 19:12:11.578853
5	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 19:12:11.581637	2021-04-29 19:12:11.581637
5	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 19:12:11.583583	2021-04-29 19:12:11.583583
5	Phòng thí nghiệm trọng điểm Các Hệ Thống Tích Hợp Thông Minh (SISLAB)	2021-04-29 19:12:11.584601	2021-04-29 19:12:11.584601
20	FET: Bộ môn Hệ thống Viễn thông	2021-04-29 19:09:08.709384	2021-04-29 19:09:08.709384
20	FET: Bộ môn Vi cơ điện tử và Vi hệ thống	2021-04-29 19:09:08.712078	2021-04-29 19:09:08.712078
20	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-04-29 19:09:08.713423	2021-04-29 19:09:08.713423
5	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 19:12:11.579102	2021-04-29 19:12:11.579102
5	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 19:12:11.581799	2021-04-29 19:12:11.581799
5	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 19:12:11.583299	2021-04-29 19:12:11.583299
5	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 19:12:11.584018	2021-04-29 19:12:11.584018
20	FET: Bộ môn Điện tử và Kỹ thuật máy tính	2021-04-29 19:09:08.709178	2021-04-29 19:09:08.709178
20	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-04-29 19:09:08.71314	2021-04-29 19:09:08.71314
5	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 19:12:11.579344	2021-04-29 19:12:11.579344
5	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 19:12:11.581961	2021-04-29 19:12:11.581961
5	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 19:12:11.583452	2021-04-29 19:12:11.583452
5	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-04-29 19:12:11.58422	2021-04-29 19:12:11.58422
20	FET: Bộ môn Thông tin Vô tuyến	2021-04-29 19:09:08.709549	2021-04-29 19:09:08.709549
20	FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-04-29 19:09:08.712996	2021-04-29 19:09:08.712996
5	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 19:12:11.581348	2021-04-29 19:12:11.581348
5	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-04-29 19:12:11.584383	2021-04-29 19:12:11.584383
4	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 19:12:29.788556	2021-04-29 19:12:29.788556
4	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 19:12:29.789921	2021-04-29 19:12:29.789921
4	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 19:12:29.79214	2021-04-29 19:12:29.79214
4	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 19:12:29.793377	2021-04-29 19:12:29.793377
4	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 19:12:29.794464	2021-04-29 19:12:29.794464
4	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-04-29 19:12:29.795132	2021-04-29 19:12:29.795132
4	SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-04-29 19:12:29.795736	2021-04-29 19:12:29.795736
20	FET: Bộ môn Kỹ thuật Robot	2021-04-29 19:09:08.70971	2021-04-29 19:09:08.70971
20	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 19:09:08.71279	2021-04-29 19:09:08.71279
20	FET: Phòng thực tập Điện tử – Viễn thông	2021-04-29 19:09:08.713816	2021-04-29 19:09:08.713816
4	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 19:12:29.788542	2021-04-29 19:12:29.788542
4	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 19:12:29.790674	2021-04-29 19:12:29.790674
4	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 19:12:29.793228	2021-04-29 19:12:29.793228
4	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 19:12:29.794072	2021-04-29 19:12:29.794072
4	Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)	2021-04-29 19:12:29.794983	2021-04-29 19:12:29.794983
4	Bộ môn Công Nghệ Xây Dựng - Giao Thông (CET)	2021-04-29 19:12:29.795882	2021-04-29 19:12:29.795882
18	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 19:09:59.766058	2021-04-29 19:09:59.766058
18	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 19:09:59.769584	2021-04-29 19:09:59.769584
18	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 19:09:59.770547	2021-04-29 19:09:59.770547
18	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 19:09:59.77273	2021-04-29 19:09:59.77273
18	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 19:09:59.776298	2021-04-29 19:09:59.776298
4	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 19:12:29.788974	2021-04-29 19:12:29.788974
4	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 19:12:29.793	2021-04-29 19:12:29.793
4	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 19:12:29.794441	2021-04-29 19:12:29.794441
4	FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-04-29 19:12:29.795227	2021-04-29 19:12:29.795227
4	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 19:12:29.789731	2021-04-29 19:12:29.789731
4	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 19:12:29.793513	2021-04-29 19:12:29.793513
4	FET: Bộ môn Thông tin Vô tuyến	2021-04-29 19:12:29.794608	2021-04-29 19:12:29.794608
4	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-04-29 19:12:29.795624	2021-04-29 19:12:29.795624
4	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 19:12:29.789731	2021-04-29 19:12:29.789731
4	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 19:12:29.793774	2021-04-29 19:12:29.793774
4	FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-04-29 19:12:29.794738	2021-04-29 19:12:29.794738
4	FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-04-29 19:12:29.795464	2021-04-29 19:12:29.795464
3	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 19:12:54.722462	2021-04-29 19:12:54.722462
3	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 19:12:54.724154	2021-04-29 19:12:54.724154
3	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 19:12:54.726576	2021-04-29 19:12:54.726576
3	FET: Bộ môn Vi cơ điện tử và Vi hệ thống	2021-04-29 19:12:54.72753	2021-04-29 19:12:54.72753
3	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-04-29 19:12:54.72834	2021-04-29 19:12:54.72834
3	SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không	2021-04-29 19:12:54.728996	2021-04-29 19:12:54.728996
3	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 19:12:54.722343	2021-04-29 19:12:54.722343
3	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 19:12:54.724356	2021-04-29 19:12:54.724356
3	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 19:12:54.726588	2021-04-29 19:12:54.726588
3	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 19:12:54.72743	2021-04-29 19:12:54.72743
3	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 19:12:54.728491	2021-04-29 19:12:54.728491
3	SAE: Bộ môn Khoa Học Dữ Liệu Không Gian	2021-04-29 19:12:54.729274	2021-04-29 19:12:54.729274
18	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 19:09:59.766558	2021-04-29 19:09:59.766558
18	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 19:09:59.769712	2021-04-29 19:09:59.769712
18	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 19:09:59.771216	2021-04-29 19:09:59.771216
18	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 19:09:59.77271	2021-04-29 19:09:59.77271
18	FET: Phòng thí nghiệm Tín hiệu và Hệ thống	2021-04-29 19:09:59.776865	2021-04-29 19:09:59.776865
3	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 19:12:54.72255	2021-04-29 19:12:54.72255
3	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 19:12:54.724616	2021-04-29 19:12:54.724616
3	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 19:12:54.726338	2021-04-29 19:12:54.726338
3	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-04-29 19:12:54.72765	2021-04-29 19:12:54.72765
3	Viện Công Nghệ Hàng Không Vũ Trụ (SAE)	2021-04-29 19:12:54.728644	2021-04-29 19:12:54.728644
3	SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-04-29 19:12:54.729573	2021-04-29 19:12:54.729573
18	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 19:09:59.766963	2021-04-29 19:09:59.766963
18	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 19:09:59.766903	2021-04-29 19:09:59.766903
18	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 19:09:59.769868	2021-04-29 19:09:59.769868
18	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 19:09:59.770148	2021-04-29 19:09:59.770148
18	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 19:09:59.771903	2021-04-29 19:09:59.771903
18	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 19:09:59.776265	2021-04-29 19:09:59.776265
18	FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-04-29 19:09:59.776864	2021-04-29 19:09:59.776864
18	Bộ môn Công Nghệ Xây Dựng - Giao Thông (CET)	2021-04-29 19:09:59.78023	2021-04-29 19:09:59.78023
3	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 19:12:54.722816	2021-04-29 19:12:54.722816
3	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 19:12:54.724748	2021-04-29 19:12:54.724748
3	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 19:12:54.72618	2021-04-29 19:12:54.72618
3	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 19:12:54.727303	2021-04-29 19:12:54.727303
3	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-04-29 19:12:54.728183	2021-04-29 19:12:54.728183
18	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 19:09:59.769348	2021-04-29 19:09:59.769348
18	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-04-29 19:09:59.776354	2021-04-29 19:09:59.776354
18	SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không	2021-04-29 19:09:59.779174	2021-04-29 19:09:59.779174
3	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 19:12:54.723079	2021-04-29 19:12:54.723079
3	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 19:12:54.727153	2021-04-29 19:12:54.727153
3	FEPN: Bộ môn Công Nghệ Quang Tử	2021-04-29 19:12:54.727972	2021-04-29 19:12:54.727972
3	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-04-29 19:12:54.728771	2021-04-29 19:12:54.728771
2	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-04-29 19:13:09.92206	2021-04-29 19:13:09.92206
2	FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-04-29 19:13:09.925078	2021-04-29 19:13:09.925078
1	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 19:13:27.616894	2021-04-29 19:13:27.616894
1	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 19:13:27.617868	2021-04-29 19:13:27.617868
1	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 19:13:27.619045	2021-04-29 19:13:27.619045
1	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 19:13:27.620045	2021-04-29 19:13:27.620045
1	SAE: Bộ môn Khoa Học Dữ Liệu Không Gian	2021-04-29 19:13:27.621536	2021-04-29 19:13:27.621536
2	FEPN: Bộ môn Công Nghệ Quang Tử	2021-04-29 19:13:09.922222	2021-04-29 19:13:09.922222
2	Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)	2021-04-29 19:13:09.92311	2021-04-29 19:13:09.92311
2	FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-04-29 19:13:09.924505	2021-04-29 19:13:09.924505
2	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-04-29 19:13:09.925521	2021-04-29 19:13:09.925521
2	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 19:13:09.922572	2021-04-29 19:13:09.922572
2	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-04-29 19:13:09.924921	2021-04-29 19:13:09.924921
2	FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-04-29 19:13:09.925872	2021-04-29 19:13:09.925872
2	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-04-29 19:13:09.922389	2021-04-29 19:13:09.922389
2	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-04-29 19:13:09.925238	2021-04-29 19:13:09.925238
2	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-04-29 19:13:09.922741	2021-04-29 19:13:09.922741
1	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 19:13:27.616163	2021-04-29 19:13:27.616163
1	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 19:13:27.618794	2021-04-29 19:13:27.618794
1	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 19:13:27.619939	2021-04-29 19:13:27.619939
1	FET: Bộ môn Điện tử và Kỹ thuật máy tính	2021-04-29 19:13:27.620988	2021-04-29 19:13:27.620988
1	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-04-29 19:13:27.622474	2021-04-29 19:13:27.622474
1	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 19:13:27.616298	2021-04-29 19:13:27.616298
1	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 19:13:27.619283	2021-04-29 19:13:27.619283
1	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 19:13:27.620308	2021-04-29 19:13:27.620308
1	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 19:13:27.621266	2021-04-29 19:13:27.621266
1	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 19:13:27.616685	2021-04-29 19:13:27.616685
1	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 19:13:27.619753	2021-04-29 19:13:27.619753
1	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 19:13:27.620775	2021-04-29 19:13:27.620775
1	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 19:13:27.616952	2021-04-29 19:13:27.616952
1	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 19:13:27.619579	2021-04-29 19:13:27.619579
1	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 19:13:27.620588	2021-04-29 19:13:27.620588
23	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-04-29 19:26:58.827704	2021-04-29 19:26:58.827704
23	Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)	2021-04-29 19:26:58.829825	2021-04-29 19:26:58.829825
23	FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-04-29 19:26:58.830841	2021-04-29 19:26:58.830841
23	SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không	2021-04-29 19:26:58.831988	2021-04-29 19:26:58.831988
23	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-04-29 19:26:58.827904	2021-04-29 19:26:58.827904
23	FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-04-29 19:26:58.830132	2021-04-29 19:26:58.830132
23	Viện Công Nghệ Hàng Không Vũ Trụ (SAE)	2021-04-29 19:26:58.831272	2021-04-29 19:26:58.831272
23	SAE: Bộ môn Khoa Học Dữ Liệu Không Gian	2021-04-29 19:26:58.832236	2021-04-29 19:26:58.832236
23	FEPN: Bộ môn Công Nghệ Quang Tử	2021-04-29 19:26:58.827801	2021-04-29 19:26:58.827801
23	FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-04-29 19:26:58.83013	2021-04-29 19:26:58.83013
23	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-04-29 19:26:58.831383	2021-04-29 19:26:58.831383
23	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 19:26:58.828561	2021-04-29 19:26:58.828561
23	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-04-29 19:26:58.831419	2021-04-29 19:26:58.831419
23	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-04-29 19:26:58.829038	2021-04-29 19:26:58.829038
23	SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-04-29 19:26:58.831576	2021-04-29 19:26:58.831576
23	Bộ môn Công Nghệ Xây Dựng - Giao Thông (CET)	2021-04-29 19:26:58.832795	2021-04-29 19:26:58.832795
25	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 19:30:37.279469	2021-04-29 19:30:37.279469
25	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 19:30:37.279441	2021-04-29 19:30:37.279441
25	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 19:30:37.28375	2021-04-29 19:30:37.28375
25	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 19:30:37.284012	2021-04-29 19:30:37.284012
25	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 19:30:37.284801	2021-04-29 19:30:37.284801
25	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 19:30:37.288298	2021-04-29 19:30:37.288298
25	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 19:30:37.288955	2021-04-29 19:30:37.288955
25	FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-04-29 19:30:37.290207	2021-04-29 19:30:37.290207
25	FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-04-29 19:30:37.291256	2021-04-29 19:30:37.291256
25	Viện tiến tiến về Kỹ thuật và Công nghệ (AVITECH)	2021-04-29 19:30:37.291519	2021-04-29 19:30:37.291519
25	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 19:30:37.281547	2021-04-29 19:30:37.281547
25	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 19:30:37.28581	2021-04-29 19:30:37.28581
25	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 19:30:37.289395	2021-04-29 19:30:37.289395
25	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-04-29 19:30:37.291487	2021-04-29 19:30:37.291487
25	Bộ môn Công Nghệ Xây Dựng - Giao Thông (CET)	2021-04-29 19:30:37.292505	2021-04-29 19:30:37.292505
25	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 19:30:37.281896	2021-04-29 19:30:37.281896
25	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 19:30:37.284305	2021-04-29 19:30:37.284305
25	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 19:30:37.288137	2021-04-29 19:30:37.288137
25	Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)	2021-04-29 19:30:37.289616	2021-04-29 19:30:37.289616
25	FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-04-29 19:30:37.291493	2021-04-29 19:30:37.291493
25	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 19:30:37.283129	2021-04-29 19:30:37.283129
25	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 19:30:37.289206	2021-04-29 19:30:37.289206
25	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 19:30:37.290948	2021-04-29 19:30:37.290948
25	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-04-29 19:30:37.29219	2021-04-29 19:30:37.29219
22	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 20:25:42.266864	2021-04-29 20:25:42.266864
22	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 20:25:42.270363	2021-04-29 20:25:42.270363
22	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 20:25:42.271277	2021-04-29 20:25:42.271277
22	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 20:25:42.272322	2021-04-29 20:25:42.272322
22	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 20:25:42.273279	2021-04-29 20:25:42.273279
22	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-04-29 20:25:42.27412	2021-04-29 20:25:42.27412
22	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-04-29 20:25:42.27502	2021-04-29 20:25:42.27502
22	Phòng thí nghiệm trọng điểm Các Hệ Thống Tích Hợp Thông Minh (SISLAB)	2021-04-29 20:25:42.275838	2021-04-29 20:25:42.275838
22	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 20:25:42.269925	2021-04-29 20:25:42.269925
22	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 20:25:42.271836	2021-04-29 20:25:42.271836
22	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 20:25:42.272921	2021-04-29 20:25:42.272921
22	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 20:25:42.273796	2021-04-29 20:25:42.273796
22	Viện Công Nghệ Hàng Không Vũ Trụ (SAE)	2021-04-29 20:25:42.274755	2021-04-29 20:25:42.274755
22	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 20:25:42.270246	2021-04-29 20:25:42.270246
22	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 20:25:42.272573	2021-04-29 20:25:42.272573
22	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 20:25:42.273946	2021-04-29 20:25:42.273946
22	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 20:25:42.274852	2021-04-29 20:25:42.274852
22	SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không	2021-04-29 20:25:42.275679	2021-04-29 20:25:42.275679
22	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 20:25:42.270505	2021-04-29 20:25:42.270505
22	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 20:25:42.273048	2021-04-29 20:25:42.273048
22	FEPN: Bộ môn Công Nghệ Quang Tử	2021-04-29 20:25:42.274424	2021-04-29 20:25:42.274424
22	SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-04-29 20:25:42.275174	2021-04-29 20:25:42.275174
22	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 20:25:42.271049	2021-04-29 20:25:42.271049
22	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 20:25:42.273521	2021-04-29 20:25:42.273521
22	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-04-29 20:25:42.274543	2021-04-29 20:25:42.274543
22	SAE: Bộ môn Khoa Học Dữ Liệu Không Gian	2021-04-29 20:25:42.275453	2021-04-29 20:25:42.275453
22	Trung tâm Nghiên cứu Điện tử - Viễn thông (CETR)	2021-04-29 20:25:42.276221	2021-04-29 20:25:42.276221
21	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 20:27:08.650116	2021-04-29 20:27:08.650116
21	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 20:27:08.653296	2021-04-29 20:27:08.653296
21	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 20:27:08.65492	2021-04-29 20:27:08.65492
21	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 20:27:08.748206	2021-04-29 20:27:08.748206
21	FEPN: Bộ môn Công Nghệ Quang Tử	2021-04-29 20:27:08.75028	2021-04-29 20:27:08.75028
21	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-04-29 20:27:08.751216	2021-04-29 20:27:08.751216
21	FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-04-29 20:27:08.752575	2021-04-29 20:27:08.752575
21	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-04-29 20:27:08.650281	2021-04-29 20:27:08.650281
21	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 20:27:08.652688	2021-04-29 20:27:08.652688
21	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 20:27:08.653609	2021-04-29 20:27:08.653609
21	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 20:27:08.654743	2021-04-29 20:27:08.654743
21	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-04-29 20:27:08.749105	2021-04-29 20:27:08.749105
21	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 20:27:08.750979	2021-04-29 20:27:08.750979
21	FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-04-29 20:27:08.752415	2021-04-29 20:27:08.752415
21	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 20:27:08.652854	2021-04-29 20:27:08.652854
21	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 20:27:08.748494	2021-04-29 20:27:08.748494
21	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 20:27:08.750689	2021-04-29 20:27:08.750689
21	Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)	2021-04-29 20:27:08.75195	2021-04-29 20:27:08.75195
21	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-04-29 20:27:08.753093	2021-04-29 20:27:08.753093
21	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 20:27:08.652974	2021-04-29 20:27:08.652974
21	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 20:27:08.748703	2021-04-29 20:27:08.748703
21	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-04-29 20:27:08.750846	2021-04-29 20:27:08.750846
21	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-04-29 20:27:08.752244	2021-04-29 20:27:08.752244
21	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 20:27:08.65314	2021-04-29 20:27:08.65314
21	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 20:27:08.748914	2021-04-29 20:27:08.748914
21	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 20:27:08.750515	2021-04-29 20:27:08.750515
21	FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-04-29 20:27:08.751618	2021-04-29 20:27:08.751618
21	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-04-29 20:27:08.752871	2021-04-29 20:27:08.752871
8	Khoa Công Nghệ Thông Tin (FIT)	2021-05-02 11:18:51.929534	2021-05-02 11:18:51.929534
8	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-02 11:18:51.932595	2021-05-02 11:18:51.932595
8	SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-05-02 11:18:51.933646	2021-05-02 11:18:51.933646
7	Khoa Công Nghệ Thông Tin (FIT)	2021-05-02 11:29:58.917761	2021-05-02 11:29:58.917761
7	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-02 11:29:58.920013	2021-05-02 11:29:58.920013
6	Khoa Công Nghệ Thông Tin (FIT)	2021-05-02 11:51:14.945334	2021-05-02 11:51:14.945334
6	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-05-02 11:51:14.945887	2021-05-02 11:51:14.945887
6	FET: Phòng thí nghiệm Tín hiệu và Hệ thống	2021-05-02 11:51:15.143267	2021-05-02 11:51:15.143267
44	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-09 15:50:27.920496	2021-05-09 15:50:27.920496
44	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 15:50:27.920421	2021-05-09 15:50:27.920421
45	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 15:53:42.651528	2021-05-09 15:53:42.651528
45	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-09 15:53:42.652115	2021-05-09 15:53:42.652115
46	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 15:56:08.714441	2021-05-09 15:56:08.714441
46	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-09 15:56:08.718802	2021-05-09 15:56:08.718802
47	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 15:59:34.6459	2021-05-09 15:59:34.6459
47	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-09 15:59:34.646309	2021-05-09 15:59:34.646309
48	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 16:02:19.284553	2021-05-09 16:02:19.284553
48	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-09 16:02:19.290181	2021-05-09 16:02:19.290181
49	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 16:05:30.081144	2021-05-09 16:05:30.081144
49	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-09 16:05:30.082733	2021-05-09 16:05:30.082733
50	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 16:11:14.076534	2021-05-09 16:11:14.076534
50	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-09 16:11:14.077593	2021-05-09 16:11:14.077593
51	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 16:17:38.321032	2021-05-09 16:17:38.321032
51	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-09 16:17:38.321232	2021-05-09 16:17:38.321232
52	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 18:05:38.365214	2021-05-09 18:05:38.365214
52	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-09 18:05:38.367127	2021-05-09 18:05:38.367127
33	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 19:00:29.03605	2021-05-09 19:00:29.03605
33	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-09 19:00:29.037223	2021-05-09 19:00:29.037223
43	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 19:04:27.430278	2021-05-09 19:04:27.430278
32	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 19:05:14.928988	2021-05-09 19:05:14.928988
32	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-09 19:05:14.933925	2021-05-09 19:05:14.933925
\.


--
-- Data for Name: publication_editor; Type: TABLE DATA; Schema: public; Owner: suongsun
--

COPY public.publication_editor (publication_id, editor_email, db_created_on, db_updated_on) FROM stdin;
26		2021-04-29 19:07:06.187824	2021-04-29 19:07:06.187824
24		2021-04-29 19:07:54.797795	2021-04-29 19:07:54.797795
20		2021-04-29 19:09:08.718147	2021-04-29 19:09:08.718147
18		2021-04-29 19:09:59.785761	2021-04-29 19:09:59.785761
10		2021-04-29 19:10:24.819018	2021-04-29 19:10:24.819018
9		2021-04-29 19:10:46.051189	2021-04-29 19:10:46.051189
5		2021-04-29 19:12:11.588054	2021-04-29 19:12:11.588054
4		2021-04-29 19:12:29.79764	2021-04-29 19:12:29.79764
1		2021-04-29 19:13:27.624578	2021-04-29 19:13:27.624578
23		2021-04-29 19:26:58.834821	2021-04-29 19:26:58.834821
25		2021-04-29 19:30:37.29475	2021-04-29 19:30:37.29475
22		2021-04-29 20:25:42.277208	2021-04-29 20:25:42.277208
21		2021-04-29 20:27:08.755949	2021-04-29 20:27:08.755949
19		2021-04-29 20:27:43.490126	2021-04-29 20:27:43.490126
27		2021-05-01 10:16:31.112911	2021-05-01 10:16:31.112911
8		2021-05-02 11:18:51.938003	2021-05-02 11:18:51.938003
7		2021-05-02 11:29:58.934745	2021-05-02 11:29:58.934745
6		2021-05-02 11:51:15.241846	2021-05-02 11:51:15.241846
44		2021-05-09 15:50:27.951824	2021-05-09 15:50:27.951824
45		2021-05-09 15:53:42.686837	2021-05-09 15:53:42.686837
46		2021-05-09 15:56:08.737005	2021-05-09 15:56:08.737005
47		2021-05-09 15:59:34.67152	2021-05-09 15:59:34.67152
48		2021-05-09 16:02:19.310659	2021-05-09 16:02:19.310659
49		2021-05-09 16:05:30.094702	2021-05-09 16:05:30.094702
50		2021-05-09 16:11:14.091185	2021-05-09 16:11:14.091185
51		2021-05-09 16:17:38.345255	2021-05-09 16:17:38.345255
52		2021-05-09 18:05:38.388321	2021-05-09 18:05:38.388321
33		2021-05-09 19:00:29.061857	2021-05-09 19:00:29.061857
43		2021-05-09 19:04:27.469814	2021-05-09 19:04:27.469814
32		2021-05-09 19:05:15.010138	2021-05-09 19:05:15.010138
\.


--
-- Data for Name: user_division; Type: TABLE DATA; Schema: public; Owner: suongsun
--

COPY public.user_division (user_email, division_name, db_created_on, db_updated_on) FROM stdin;
minhnl@jaist.ac.jp	Japan Advanced Institute of Science and Technology	2021-04-29 19:26:58.837621	2021-04-29 19:26:58.837621
damhs@vnu.edu.vn	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-04-29 19:30:37.298233	2021-04-29 19:30:37.298233
admin@eprints.vnu.edu.vn	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-04-29 17:39:19.105572	2021-04-29 17:39:19.105572
admin@eprints.vnu.edu.vn	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-04-29 17:39:19.197206	2021-04-29 17:39:19.197206
admin@eprints.vnu.edu.vn	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-04-29 17:39:19.198789	2021-04-29 17:39:19.198789
ildiko.pete@cst.cam.ac.uk	University of Cambridge	2021-04-29 19:11:27.535546	2021-04-29 19:11:27.535546
yiting.chua@cst.cam.ac.uk	University of Cambridge	2021-04-29 19:11:27.536457	2021-04-29 19:11:27.536457
kaothanthong@tohoku.ac.jp	Tohoku University	2021-04-29 19:07:54.798578	2021-04-29 19:07:54.798578
jack.hughes@cst.cam.ac.uk	University of Cambridge	2021-04-29 19:11:27.536853	2021-04-29 19:11:27.536853
vietth@vnu.edu.vn	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-04-29 20:27:08.756906	2021-04-29 20:27:08.756906
gijun@korea.edu	Korea University	2021-04-29 19:12:11.59005	2021-04-29 19:12:11.59005
anh.vu@cst.cam.ac.uk	Khoa Công Nghệ Thông Tin (FIT)	2021-05-01 08:00:47.772884	2021-05-01 08:00:47.772884
chill@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 16:17:38.346822	2021-05-09 16:17:38.346822
muoitd@comp.nus.edu.sg	National University of Singapore	2021-04-29 19:12:11.590573	2021-04-29 19:12:11.590573
katayama@jaist.ac.jp	Japan Advanced Institute of Science and Technology (JAIST)	2021-04-29 19:13:27.626696	2021-04-29 19:13:27.626696
admin@eprints.vnu.edu.vn	FET: Phòng thực tập Điện tử – Viễn thông	2021-04-29 20:16:38.728157	2021-04-29 20:16:38.728157
admin@eprints.vnu.edu.vn	FET: Phòng thí nghiệm Tín hiệu và Hệ thống	2021-04-29 20:16:38.733929	2021-04-29 20:16:38.733929
admin@eprints.vnu.edu.vn	FET: Bộ môn Vi cơ điện tử và Vi hệ thống	2021-04-29 20:16:38.735914	2021-04-29 20:16:38.735914
admin@eprints.vnu.edu.vn	Phòng thí nghiệm trọng điểm Các Hệ Thống Tích Hợp Thông Minh (SISLAB)	2021-04-29 20:16:38.738034	2021-04-29 20:16:38.738034
admin@eprints.vnu.edu.vn	FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-04-29 20:16:38.73948	2021-04-29 20:16:38.73948
admin@eprints.vnu.edu.vn	FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-04-29 20:16:38.741779	2021-04-29 20:16:38.741779
admin@eprints.vnu.edu.vn	FIT: Bộ môn Công Nghệ Phần Mềm	2021-04-29 17:12:07.716321	2021-04-29 17:12:07.716321
admin@eprints.vnu.edu.vn	FIT: Bộ môn Khoa Học Máy Tính	2021-04-29 17:12:07.720757	2021-04-29 17:12:07.720757
admin@eprints.vnu.edu.vn	FIT: Bộ môn Khoa Học và Kỹ Thuật Tính Toán	2021-04-29 17:12:07.723134	2021-04-29 17:12:07.723134
admin@eprints.vnu.edu.vn	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-04-29 17:12:07.725205	2021-04-29 17:12:07.725205
admin@eprints.vnu.edu.vn	FIT: Phòng Thí nghiệm An Toàn Thông Tin	2021-04-29 17:12:07.726678	2021-04-29 17:12:07.726678
admin@eprints.vnu.edu.vn	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-04-29 17:12:07.72874	2021-04-29 17:12:07.72874
admin@eprints.vnu.edu.vn	FIT: Phòng Thí nghiệm Hệ Thống Nhúng	2021-04-29 17:12:07.814859	2021-04-29 17:12:07.814859
admin@eprints.vnu.edu.vn	FIT: Phòng Thí nghiệm Tương Tác Người – Máy	2021-04-29 17:12:07.816668	2021-04-29 17:12:07.816668
admin@eprints.vnu.edu.vn	FIT: Phòng Thí nghiệm mục tiêu Tối Ưu Hóa Các Hệ Thống Lớn	2021-04-29 17:12:07.817986	2021-04-29 17:12:07.817986
admin@eprints.vnu.edu.vn	FIT: Phòng Thí nghiệm mục tiêu Blockchain	2021-04-29 17:12:07.819157	2021-04-29 17:12:07.819157
admin@eprints.vnu.edu.vn	FIT: Phòng Thí nghiệm mục tiêu Tin Sinh Y Học	2021-04-29 17:12:07.820307	2021-04-29 17:12:07.820307
admin@eprints.vnu.edu.vn	FIT: Phòng Thí nghiệm mục tiêu Internet of Things	2021-04-29 17:12:07.825424	2021-04-29 17:12:07.825424
admin@eprints.vnu.edu.vn	FIT: Phòng Thí nghiệm mục tiêu Đảm Bảo Chất Lượng Phần Mềm	2021-04-29 17:12:07.82662	2021-04-29 17:12:07.82662
admin@eprints.vnu.edu.vn	FIT: Phòng Thí nghiệm mục tiêu Trí Tuệ Nhân Tạo	2021-04-29 17:12:07.914983	2021-04-29 17:12:07.914983
admin@eprints.vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-04-29 17:23:30.478322	2021-04-29 17:23:30.478322
ilia.shumailov@cst.cam.ac.uk	University of Cambridge	2021-04-29 19:11:27.535397	2021-04-29 19:11:27.535397
admin@eprints.vnu.edu.vn	FEPN: Bộ môn Công Nghệ Quang Tử	2021-04-29 17:42:46.603086	2021-04-29 17:42:46.603086
ben.collier@cst.cam.ac.uk	University of Cambridge	2021-04-29 19:11:27.536008	2021-04-29 19:11:27.536008
admin@eprints.vnu.edu.vn	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-04-29 17:43:01.873435	2021-04-29 17:43:01.873435
alice.hutchings@cst.cam.ac.uk	University of Cambridge	2021-04-29 19:11:27.536611	2021-04-29 19:11:27.536611
mizuhito@jaist.ac.jp	Japan Advanced Institute of Science and Technology	2021-04-29 19:11:54.361777	2021-04-29 19:11:54.361777
kangms@kaist.ac.uk	Korea Advanced Institute of Science and Technology	2021-04-29 19:12:11.589936	2021-04-29 19:12:11.589936
nhanlt@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT	2021-05-09 18:05:38.394046	2021-05-09 18:05:38.394046
inho@yonsei.ac.kr	Yonsei University	2021-04-29 19:12:11.591005	2021-04-29 19:12:11.591005
susumu@tokoku.ac.jp	Tohoku University	2021-04-29 19:26:58.837425	2021-04-29 19:26:58.837425
admin@eprints.vnu.edu.vn	Viện Công Nghệ Hàng Không Vũ Trụ (SAE)	2021-04-29 18:14:17.771419	2021-04-29 18:14:17.771419
huen@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 19:00:29.073128	2021-05-09 19:00:29.073128
admin@eprints.vnu.edu.vn	SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-04-29 18:14:17.772984	2021-04-29 18:14:17.772984
aoki@jaist.ac.jp	Japan Advanced Institute of Science and Technology (JAIST)	2021-04-29 19:13:27.626154	2021-04-29 19:13:27.626154
admin@eprints.vnu.edu.vn	SAE: Bộ môn Khoa Học Dữ Liệu Không Gian	2021-04-29 18:14:17.776409	2021-04-29 18:14:17.776409
admin@eprints.vnu.edu.vn	Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)	2021-04-29 18:21:42.259521	2021-04-29 18:21:42.259521
cuongbq@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 19:00:29.086064	2021-05-09 19:00:29.086064
admin@eprints.vnu.edu.vn	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-04-29 20:16:38.742763	2021-04-29 20:16:38.742763
admin@eprints.vnu.edu.vn	FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-04-29 20:16:38.743663	2021-04-29 20:16:38.743663
admin@eprints.vnu.edu.vn	SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không	2021-04-29 20:16:38.744595	2021-04-29 20:16:38.744595
admin@eprints.vnu.edu.vn	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-04-29 18:21:42.356264	2021-04-29 18:21:42.356264
admin@eprints.vnu.edu.vn	Phòng Thí nghiệm trọng điểm Công Nghệ Micro và Nano (NANOLAB)	2021-04-29 18:37:18.432679	2021-04-29 18:37:18.432679
admin@eprints.vnu.edu.vn	Bộ môn Công Nghệ Xây Dựng - Giao Thông (CET)	2021-04-29 19:07:37.174231	2021-04-29 19:07:37.174231
admin@eprints.vnu.edu.vn	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-04-29 19:07:37.1777	2021-04-29 19:07:37.1777
admin@eprints.vnu.edu.vn	Khoa Điện Tử - Viễn Thông (FET)	2021-04-29 19:12:47.172286	2021-04-29 19:12:47.172286
admin@eprints.vnu.edu.vn	FET: Bộ môn Điện tử và Kỹ thuật máy tính	2021-04-29 19:12:47.17348	2021-04-29 19:12:47.17348
admin@eprints.vnu.edu.vn	FET: Bộ môn Hệ thống Viễn thông	2021-04-29 19:12:47.261181	2021-04-29 19:12:47.261181
khadm@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 19:04:27.477874	2021-05-09 19:04:27.477874
admin@eprints.vnu.edu.vn	FET: Bộ môn Kỹ thuật Robot	2021-04-29 19:13:14.296572	2021-04-29 19:13:14.296572
		2021-05-09 19:05:15.021657	2021-05-09 19:05:15.021657
admin@eprints.vnu.edu.vn	FET: Bộ môn Thông tin Vô tuyến	2021-04-29 19:13:14.29788	2021-04-29 19:13:14.29788
admin@eprints.vnu.edu.vn	Viện tiến tiến về Kỹ thuật và Công nghệ (AVITECH)	2021-04-29 19:17:04.688602	2021-04-29 19:17:04.688602
admin@eprints.vnu.edu.vn	Trung tâm Nghiên cứu Điện tử - Viễn thông (CETR)	2021-04-29 19:20:15.769427	2021-04-29 19:20:15.769427
tokuyama@jaist.ac.jp	Tohoku University	2021-04-29 19:07:54.800909	2021-04-29 19:07:54.800909
khanhtv@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 18:05:38.396007	2021-05-09 18:05:38.396007
huongtn@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 19:04:27.508934	2021-05-09 19:04:27.508934
hanv@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 19:05:15.023809	2021-05-09 19:05:15.023809
mmm@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 11:09:50.35177	2021-05-09 11:09:50.35177
admin@eprints.vnu.edu.vn	FIT: Bộ môn Các Hệ Thống Thông Tin	2021-05-09 18:26:59.879913	2021-05-09 18:26:59.879913
admin@eprints.vnu.edu.vn	Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-05-09 18:26:59.885427	2021-05-09 18:26:59.885427
duongtd@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 15:59:34.676774	2021-05-09 15:59:34.676774
tungnd@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 15:59:34.6814	2021-05-09 15:59:34.6814
huongvd@vnu.edu.vn	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-02 07:53:24.060232	2021-05-02 07:53:24.060232
longtq@vnu.edu.vn	FIT: Bộ môn Khoa Học Máy Tính	2021-05-02 07:58:20.074188	2021-05-02 07:58:20.074188
khoiln@vnu.edu.vn	FIT: Bộ môn Khoa Học Máy Tính	2021-05-02 08:04:54.536668	2021-05-02 08:04:54.536668
huonggiangdt@vnu.edu.vn	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-05-02 08:28:03.341069	2021-05-02 08:28:03.341069
huonggiangdt@vnu.edu.vn	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-05-02 08:28:03.343795	2021-05-02 08:28:03.343795
huonggiangdt@vnu.edu.vn	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-05-02 08:28:03.344846	2021-05-02 08:28:03.344846
huonggiangdt@vnu.edu.vn	FEPN: Bộ môn Công Nghệ Quang Tử	2021-05-02 08:28:03.346107	2021-05-02 08:28:03.346107
huonggiangdt@vnu.edu.vn	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-05-02 08:28:03.347275	2021-05-02 08:28:03.347275
cuongdn@vnu.edu.vn	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-05-02 08:44:17.31065	2021-05-02 08:44:17.31065
cuongdn@vnu.edu.vn	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-05-02 08:44:17.313638	2021-05-02 08:44:17.313638
cuongdn@vnu.edu.vn	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-05-02 08:44:17.314801	2021-05-02 08:44:17.314801
cuongdn@vnu.edu.vn	FEPN: Bộ môn Công Nghệ Quang Tử	2021-05-02 08:44:17.315879	2021-05-02 08:44:17.315879
cuongdn@vnu.edu.vn	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-05-02 08:44:17.316933	2021-05-02 08:44:17.316933
thanhvannt@vnu.edu.vn	FET: Bộ môn Điện tử và Kỹ thuật máy tính	2021-05-02 08:49:06.604347	2021-05-02 08:49:06.604347
thanhvannt@vnu.edu.vn	FET: Bộ môn Hệ thống Viễn thông	2021-05-02 08:49:06.606125	2021-05-02 08:49:06.606125
thanhvannt@vnu.edu.vn	FET: Bộ môn Kỹ thuật Robot	2021-05-02 08:49:06.607182	2021-05-02 08:49:06.607182
thanhvannt@vnu.edu.vn	FET: Bộ môn Thông tin Vô tuyến	2021-05-02 08:49:06.608478	2021-05-02 08:49:06.608478
thanhvannt@vnu.edu.vn	FET: Bộ môn Vi cơ điện tử và Vi hệ thống	2021-05-02 08:49:06.610164	2021-05-02 08:49:06.610164
thanhvannt@vnu.edu.vn	FET: Phòng thí nghiệm Tín hiệu và Hệ thống	2021-05-02 08:49:06.611322	2021-05-02 08:49:06.611322
thanhvannt@vnu.edu.vn	FET: Phòng thực tập Điện tử – Viễn thông	2021-05-02 08:49:06.612719	2021-05-02 08:49:06.612719
thanhvannt@vnu.edu.vn	Khoa Điện Tử - Viễn Thông (FET)	2021-05-02 08:49:06.613601	2021-05-02 08:49:06.613601
vuta@vnu.edu.vn	FET: Bộ môn Điện tử và Kỹ thuật máy tính	2021-05-02 10:50:55.990832	2021-05-02 10:50:55.990832
vuta@vnu.edu.vn	FET: Bộ môn Hệ thống Viễn thông	2021-05-02 10:50:55.992869	2021-05-02 10:50:55.992869
vuta@vnu.edu.vn	FET: Bộ môn Kỹ thuật Robot	2021-05-02 10:50:55.994014	2021-05-02 10:50:55.994014
vuta@vnu.edu.vn	FET: Bộ môn Thông tin Vô tuyến	2021-05-02 10:50:55.995865	2021-05-02 10:50:55.995865
vuta@vnu.edu.vn	FET: Bộ môn Vi cơ điện tử và Vi hệ thống	2021-05-02 10:50:55.996969	2021-05-02 10:50:55.996969
vuta@vnu.edu.vn	FET: Phòng thí nghiệm Tín hiệu và Hệ thống	2021-05-02 10:50:55.998471	2021-05-02 10:50:55.998471
vuta@vnu.edu.vn	FET: Phòng thực tập Điện tử – Viễn thông	2021-05-02 10:50:56.000132	2021-05-02 10:50:56.000132
vuta@vnu.edu.vn	Khoa Điện Tử - Viễn Thông (FET)	2021-05-02 10:50:56.001697	2021-05-02 10:50:56.001697
badt@vnu.edu.vn	FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-05-02 10:54:29.537984	2021-05-02 10:54:29.537984
badt@vnu.edu.vn	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-05-02 10:54:29.540626	2021-05-02 10:54:29.540626
badt@vnu.edu.vn	FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-05-02 10:54:29.541691	2021-05-02 10:54:29.541691
badt@vnu.edu.vn	FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-05-02 10:54:29.542783	2021-05-02 10:54:29.542783
badt@vnu.edu.vn	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-05-02 10:54:29.543797	2021-05-02 10:54:29.543797
badt@vnu.edu.vn	Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)	2021-05-02 10:54:29.544781	2021-05-02 10:54:29.544781
hungtc@vnu.edu.vn	FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-05-02 10:56:30.117441	2021-05-02 10:56:30.117441
hungtc@vnu.edu.vn	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-05-02 10:56:30.118942	2021-05-02 10:56:30.118942
hungtc@vnu.edu.vn	FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-05-02 10:56:30.120034	2021-05-02 10:56:30.120034
hungtc@vnu.edu.vn	FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-05-02 10:56:30.121113	2021-05-02 10:56:30.121113
hungtc@vnu.edu.vn	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-05-02 10:56:30.122491	2021-05-02 10:56:30.122491
hungtc@vnu.edu.vn	Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)	2021-05-02 10:56:30.124314	2021-05-02 10:56:30.124314
hienlt@vnu.edu.vn	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-05-02 11:02:03.914316	2021-05-02 11:02:03.914316
khoatd@vnu.edu.vn	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-05-02 11:03:33.535981	2021-05-02 11:03:33.535981
chaunth@vnu.edu.vn	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-02 07:54:56.463455	2021-05-02 07:54:56.463455
huanhx@vnu.edu.vn	FIT: Bộ môn Khoa Học Máy Tính	2021-05-02 07:59:26.915391	2021-05-02 07:59:26.915391
okkoko@dfvv.com	FIT: Bộ môn Mạng và Truyền Thông Máy Tính	2021-05-02 04:10:35.637549	2021-05-02 04:10:35.637549
vinhnv@vnu.edu.vn	FIT: Bộ môn Khoa Học Máy Tính	2021-05-02 08:05:36.63611	2021-05-02 08:05:36.63611
dinhnn@vnu.edu.vn	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-05-02 08:30:58.828799	2021-05-02 08:30:58.828799
dinhnn@vnu.edu.vn	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-05-02 08:30:58.831571	2021-05-02 08:30:58.831571
dinhnn@vnu.edu.vn	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-05-02 08:30:58.832811	2021-05-02 08:30:58.832811
dinhnn@vnu.edu.vn	FEPN: Bộ môn Công Nghệ Quang Tử	2021-05-02 08:30:58.834051	2021-05-02 08:30:58.834051
dinhnn@vnu.edu.vn	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-05-02 08:30:58.835122	2021-05-02 08:30:58.835122
lamnd@vnu.edu.vn	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-05-02 08:45:10.956492	2021-05-02 08:45:10.956492
lamnd@vnu.edu.vn	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-05-02 08:45:10.95903	2021-05-02 08:45:10.95903
lamnd@vnu.edu.vn	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-05-02 08:45:10.960434	2021-05-02 08:45:10.960434
lamnd@vnu.edu.vn	FEPN: Bộ môn Công Nghệ Quang Tử	2021-05-02 08:45:10.962472	2021-05-02 08:45:10.962472
lamnd@vnu.edu.vn	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-05-02 08:45:10.963881	2021-05-02 08:45:10.963881
trinhcd@vnu.edu.vn	FET: Bộ môn Điện tử và Kỹ thuật máy tính	2021-05-02 10:41:16.834396	2021-05-02 10:41:16.834396
trinhcd@vnu.edu.vn	FET: Bộ môn Hệ thống Viễn thông	2021-05-02 10:41:16.840076	2021-05-02 10:41:16.840076
trinhcd@vnu.edu.vn	FET: Bộ môn Kỹ thuật Robot	2021-05-02 10:41:16.842164	2021-05-02 10:41:16.842164
trinhcd@vnu.edu.vn	FET: Bộ môn Thông tin Vô tuyến	2021-05-02 10:41:16.847446	2021-05-02 10:41:16.847446
trinhcd@vnu.edu.vn	FET: Bộ môn Vi cơ điện tử và Vi hệ thống	2021-05-02 10:41:16.850345	2021-05-02 10:41:16.850345
trinhcd@vnu.edu.vn	FET: Phòng thí nghiệm Tín hiệu và Hệ thống	2021-05-02 10:41:16.853023	2021-05-02 10:41:16.853023
trinhcd@vnu.edu.vn	FET: Phòng thực tập Điện tử – Viễn thông	2021-05-02 10:41:16.854394	2021-05-02 10:41:16.854394
trinhcd@vnu.edu.vn	Khoa Điện Tử - Viễn Thông (FET)	2021-05-02 10:41:16.855994	2021-05-02 10:41:16.855994
tutx@vnu.edu.vn	FET: Bộ môn Điện tử và Kỹ thuật máy tính	2021-05-02 10:48:55.40877	2021-05-02 10:48:55.40877
tutx@vnu.edu.vn	FET: Bộ môn Hệ thống Viễn thông	2021-05-02 10:48:55.411298	2021-05-02 10:48:55.411298
tutx@vnu.edu.vn	FET: Bộ môn Kỹ thuật Robot	2021-05-02 10:48:55.412289	2021-05-02 10:48:55.412289
tutx@vnu.edu.vn	FET: Bộ môn Thông tin Vô tuyến	2021-05-02 10:48:55.413311	2021-05-02 10:48:55.413311
tutx@vnu.edu.vn	FET: Bộ môn Vi cơ điện tử và Vi hệ thống	2021-05-02 10:48:55.415354	2021-05-02 10:48:55.415354
tutx@vnu.edu.vn	FET: Phòng thí nghiệm Tín hiệu và Hệ thống	2021-05-02 10:48:55.416307	2021-05-02 10:48:55.416307
tutx@vnu.edu.vn	FET: Phòng thực tập Điện tử – Viễn thông	2021-05-02 10:48:55.417266	2021-05-02 10:48:55.417266
tutx@vnu.edu.vn	Khoa Điện Tử - Viễn Thông (FET)	2021-05-02 10:48:55.418099	2021-05-02 10:48:55.418099
dungnv@vnu.edu.vn	FET: Bộ môn Điện tử và Kỹ thuật máy tính	2021-05-02 10:51:38.70115	2021-05-02 10:51:38.70115
dungnv@vnu.edu.vn	FET: Bộ môn Hệ thống Viễn thông	2021-05-02 10:51:38.703721	2021-05-02 10:51:38.703721
dungnv@vnu.edu.vn	FET: Bộ môn Kỹ thuật Robot	2021-05-02 10:51:38.70497	2021-05-02 10:51:38.70497
dungnv@vnu.edu.vn	FET: Bộ môn Thông tin Vô tuyến	2021-05-02 10:51:38.706623	2021-05-02 10:51:38.706623
dungnv@vnu.edu.vn	FET: Bộ môn Vi cơ điện tử và Vi hệ thống	2021-05-02 10:51:38.707761	2021-05-02 10:51:38.707761
trungnq@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 16:17:38.349717	2021-05-09 16:17:38.349717
thuantn@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 18:05:38.396909	2021-05-09 18:05:38.396909
hieuvd@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 19:00:29.088336	2021-05-09 19:00:29.088336
dungnv@vnu.edu.vn	FET: Phòng thí nghiệm Tín hiệu và Hệ thống	2021-05-02 10:51:38.708793	2021-05-02 10:51:38.708793
dungnv@vnu.edu.vn	FET: Phòng thực tập Điện tử – Viễn thông	2021-05-02 10:51:38.709836	2021-05-02 10:51:38.709836
dungnv@vnu.edu.vn	Khoa Điện Tử - Viễn Thông (FET)	2021-05-02 10:51:38.710828	2021-05-02 10:51:38.710828
thangpm@vnu.edu.vn	FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-05-02 10:55:08.602963	2021-05-02 10:55:08.602963
thangpm@vnu.edu.vn	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-05-02 10:55:08.606214	2021-05-02 10:55:08.606214
thangpm@vnu.edu.vn	FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-05-02 10:55:08.608109	2021-05-02 10:55:08.608109
thangpm@vnu.edu.vn	FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-05-02 10:55:08.609143	2021-05-02 10:55:08.609143
thangpm@vnu.edu.vn	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-05-02 10:55:08.610286	2021-05-02 10:55:08.610286
thangpm@vnu.edu.vn	Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)	2021-05-02 10:55:08.611287	2021-05-02 10:55:08.611287
linhnn@vnu.edu.vn	FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-05-02 10:57:13.809826	2021-05-02 10:57:13.809826
linhnn@vnu.edu.vn	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-05-02 10:57:13.811934	2021-05-02 10:57:13.811934
linhnn@vnu.edu.vn	FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-05-02 10:57:13.815437	2021-05-02 10:57:13.815437
linhnn@vnu.edu.vn	FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-05-02 10:57:13.817499	2021-05-02 10:57:13.817499
linhnn@vnu.edu.vn	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-05-02 10:57:13.819965	2021-05-02 10:57:13.819965
linhnn@vnu.edu.vn	Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)	2021-05-02 10:57:13.823157	2021-05-02 10:57:13.823157
khanhnl@vnu.edu.vn	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-05-02 11:02:39.288743	2021-05-02 11:02:39.288743
thainp@vnu.edu.vn	FIT: Bộ môn Khoa Học Máy Tính	2021-05-02 08:04:06.344215	2021-05-02 08:04:06.344215
chauttm@vnu.edu.vn	FIT: Bộ môn Khoa Học Máy Tính	2021-05-02 08:07:13.458122	2021-05-02 08:07:13.458122
nhathn@vnu.edu.vn	FEPN: Bộ môn Vật Liệu và Linh Kiện Bán Dẫn Nano	2021-05-02 08:38:20.250571	2021-05-02 08:38:20.250571
nhathn@vnu.edu.vn	FEPN: Bộ môn Vật Liệu và Linh Kiện Từ Tính Nano	2021-05-02 08:38:20.254453	2021-05-02 08:38:20.254453
nhathn@vnu.edu.vn	FEPN: Bộ môn Kỹ Thuật Năng Lượng	2021-05-02 08:38:20.255715	2021-05-02 08:38:20.255715
nhathn@vnu.edu.vn	FEPN: Bộ môn Công Nghệ Quang Tử	2021-05-02 08:38:20.256817	2021-05-02 08:38:20.256817
nhathn@vnu.edu.vn	Khoa Vật Lý Kỹ Thuật và Công Nghệ Nano (FEPN)	2021-05-02 08:38:20.258393	2021-05-02 08:38:20.258393
duongdt@vnu.edu.vn	FET: Bộ môn Điện tử và Kỹ thuật máy tính	2021-05-02 08:48:16.454108	2021-05-02 08:48:16.454108
duongdt@vnu.edu.vn	FET: Bộ môn Hệ thống Viễn thông	2021-05-02 08:48:16.458208	2021-05-02 08:48:16.458208
duongdt@vnu.edu.vn	FET: Bộ môn Kỹ thuật Robot	2021-05-02 08:48:16.459281	2021-05-02 08:48:16.459281
duongdt@vnu.edu.vn	FET: Bộ môn Thông tin Vô tuyến	2021-05-02 08:48:16.460339	2021-05-02 08:48:16.460339
duongdt@vnu.edu.vn	FET: Bộ môn Vi cơ điện tử và Vi hệ thống	2021-05-02 08:48:16.461459	2021-05-02 08:48:16.461459
duongdt@vnu.edu.vn	FET: Phòng thí nghiệm Tín hiệu và Hệ thống	2021-05-02 08:48:16.462445	2021-05-02 08:48:16.462445
duongdt@vnu.edu.vn	FET: Phòng thực tập Điện tử – Viễn thông	2021-05-02 08:48:16.464093	2021-05-02 08:48:16.464093
duongdt@vnu.edu.vn	Khoa Điện Tử - Viễn Thông (FET)	2021-05-02 08:48:16.468284	2021-05-02 08:48:16.468284
hoangnn@vnu.edu.vn	FET: Bộ môn Điện tử và Kỹ thuật máy tính	2021-05-02 10:42:03.202004	2021-05-02 10:42:03.202004
hoangnn@vnu.edu.vn	FET: Bộ môn Hệ thống Viễn thông	2021-05-02 10:42:03.204511	2021-05-02 10:42:03.204511
hoangnn@vnu.edu.vn	FET: Bộ môn Kỹ thuật Robot	2021-05-02 10:42:03.205609	2021-05-02 10:42:03.205609
hoangnn@vnu.edu.vn	FET: Bộ môn Thông tin Vô tuyến	2021-05-02 10:42:03.207098	2021-05-02 10:42:03.207098
hoangnn@vnu.edu.vn	FET: Bộ môn Vi cơ điện tử và Vi hệ thống	2021-05-02 10:42:03.209113	2021-05-02 10:42:03.209113
hoangnn@vnu.edu.vn	FET: Phòng thí nghiệm Tín hiệu và Hệ thống	2021-05-02 10:42:03.210207	2021-05-02 10:42:03.210207
hoangnn@vnu.edu.vn	FET: Phòng thực tập Điện tử – Viễn thông	2021-05-02 10:42:03.211178	2021-05-02 10:42:03.211178
hoangnn@vnu.edu.vn	Khoa Điện Tử - Viễn Thông (FET)	2021-05-02 10:42:03.212082	2021-05-02 10:42:03.212082
trangnt@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 19:00:29.090141	2021-05-09 19:00:29.090141
hoangta@vnu.edu.vn	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-02 07:49:02.060263	2021-05-02 07:49:02.060263
anhnv@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 11:05:27.518269	2021-05-09 11:05:27.518269
hoangtv@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 19:05:15.020811	2021-05-09 19:05:15.020811
cuonglb@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 11:49:24.471592	2021-05-09 11:49:24.471592
anhnd@vnu.edu.vn	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-09 15:50:27.968907	2021-05-09 15:50:27.968907
daovt@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 16:02:19.313147	2021-05-09 16:02:19.313147
ducnd@vnu.edu.vn	FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-05-02 10:53:49.197075	2021-05-02 10:53:49.197075
ducnd@vnu.edu.vn	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-05-02 10:53:49.198598	2021-05-02 10:53:49.198598
ducnd@vnu.edu.vn	FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-05-02 10:53:49.199659	2021-05-02 10:53:49.199659
ducnd@vnu.edu.vn	FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-05-02 10:53:49.200649	2021-05-02 10:53:49.200649
ducnd@vnu.edu.vn	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-05-02 10:53:49.201687	2021-05-02 10:53:49.201687
ducnd@vnu.edu.vn	Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)	2021-05-02 10:53:49.202873	2021-05-02 10:53:49.202873
hiepdt@vnu.edu.vn	FEMA: Bộ môn Công Nghệ Biển và Môi Trường	2021-05-02 10:55:53.803283	2021-05-02 10:55:53.803283
hiepdt@vnu.edu.vn	FEMA: Bộ môn Cơ Điện Tử và Tự Động Hoá	2021-05-02 10:55:53.805166	2021-05-02 10:55:53.805166
hiepdt@vnu.edu.vn	FEMA: Bộ môn Công Nghệ Hàng Không Vũ Trụ	2021-05-02 10:55:53.806193	2021-05-02 10:55:53.806193
hiepdt@vnu.edu.vn	FEMA: Bộ môn Thuỷ Khí Công Nghiệp và Môi Trường	2021-05-02 10:55:53.80765	2021-05-02 10:55:53.80765
hiepdt@vnu.edu.vn	FEMA: Phòng Thí nghiệm Vật Liệu và Kết Cấu Tiên Tiến	2021-05-02 10:55:53.808706	2021-05-02 10:55:53.808706
hiepdt@vnu.edu.vn	Khoa Cơ Học Kỹ Thuật và Tự Động Hoá (FEMA)	2021-05-02 10:55:53.813474	2021-05-02 10:55:53.813474
hamlh@vnu.edu.vn	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-05-02 10:59:30.806901	2021-05-02 10:59:30.806901
khoatv@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-02 11:18:51.945344	2021-05-02 11:18:51.945344
trungnl@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-02 11:18:51.947024	2021-05-02 11:18:51.947024
minhld@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-02 11:29:58.933686	2021-05-02 11:29:58.933686
hanhdd@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-02 11:29:58.93687	2021-05-02 11:29:58.93687
tuyentd@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-02 11:51:15.242831	2021-05-02 11:51:15.242831
tuanbm@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-02 11:51:15.243052	2021-05-02 11:51:15.243052
quyenht@vnu.edu.vn	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-05-08 19:41:33.49474	2021-05-08 19:41:33.49474
trienpm@vnu.edu.vn	Khoa Công Nghệ Nông Nghiệp (FAT)	2021-05-08 19:43:06.568567	2021-05-08 19:43:06.568567
anld@vnu.edu.vn	SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-05-08 19:47:59.060483	2021-05-08 19:47:59.060483
anld@vnu.edu.vn	SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không	2021-05-08 19:47:59.062727	2021-05-08 19:47:59.062727
anld@vnu.edu.vn	SAE: Bộ môn Khoa Học Dữ Liệu Không Gian	2021-05-08 19:47:59.064081	2021-05-08 19:47:59.064081
anld@vnu.edu.vn	Viện Công Nghệ Hàng Không Vũ Trụ (SAE)	2021-05-08 19:47:59.065139	2021-05-08 19:47:59.065139
cuonghm@vnu.edu.vn	SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-05-08 19:48:45.462845	2021-05-08 19:48:45.462845
cuonghm@vnu.edu.vn	SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không	2021-05-08 19:48:45.464384	2021-05-08 19:48:45.464384
cuonghm@vnu.edu.vn	SAE: Bộ môn Khoa Học Dữ Liệu Không Gian	2021-05-08 19:48:45.466059	2021-05-08 19:48:45.466059
cuonghm@vnu.edu.vn	Viện Công Nghệ Hàng Không Vũ Trụ (SAE)	2021-05-08 19:48:45.467175	2021-05-08 19:48:45.467175
dungdv@vnu.edu.vn	SAE: Bộ môn Điện Tử Và Thông Tin Hàng Không	2021-05-08 19:49:40.383129	2021-05-08 19:49:40.383129
dungdv@vnu.edu.vn	SAE: Bộ môn Cơ Khí, Động Lực Học Hàng Không	2021-05-08 19:49:40.388027	2021-05-08 19:49:40.388027
dungdv@vnu.edu.vn	SAE: Bộ môn Khoa Học Dữ Liệu Không Gian	2021-05-08 19:49:40.395543	2021-05-08 19:49:40.395543
dungdv@vnu.edu.vn	Viện Công Nghệ Hàng Không Vũ Trụ (SAE)	2021-05-08 19:49:40.410309	2021-05-08 19:49:40.410309
hungpn@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 19:05:15.021041	2021-05-09 19:05:15.021041
hieupx@vnu.edu.vn	FIT: Phòng Thí nghiệm Công Nghệ Tri Thức	2021-05-09 11:13:15.82676	2021-05-09 11:13:15.82676
quangtn@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 15:53:42.693942	2021-05-09 15:53:42.693942
hungdv@vnu.edu.vn	FIT: Bộ môn Công Nghệ Phần Mềm	2021-05-09 15:56:08.746071	2021-05-09 15:56:08.746071
sonnv@vnu.edu.vn	Khoa Công Nghệ Thông Tin (FIT)	2021-05-09 16:11:14.096057	2021-05-09 16:11:14.096057
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: suongsun
--

COPY public.users (email, family_name, given_name, hide_email, password, address, is_admin, description, registration_date, last_login, is_approved, db_created_on, db_updated_on, academic_title, manager_title, union_title) FROM stdin;
huongvd@vnu.edu.vn	Vũ 	Diệu Hương	t	$2b$10$WI7kPqJdCjtN3QFFST8Os.trruD.wp2IQxJUbzB0LUtWt1EiDqJuC		f		2021-05-02 14:53:23.982	\N	t	2021-05-02 07:53:04.828524	2021-05-02 07:53:04.828524	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
chaunth@vnu.edu.vn	Nguyễn 	Thị Huyền Châu	t	$2b$10$ag1AIcdw7SISMmxbDYX/dehYGc/heX.uH614OJPCo3J8A3MczbptW		f		2021-05-02 14:54:56.371	\N	t	2021-05-02 07:54:56.458053	2021-05-02 07:54:56.458053	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
huanhx@vnu.edu.vn	Hoàng	Xuân Huấn	t	$2b$10$S/GyTrCvehsqw/jT8Sy/zO7k0/DMEw4NlBWwmWwbXviVihdw8/OIm		f		2021-05-02 14:59:26.801	\N	t	2021-05-02 07:59:26.909448	2021-05-02 07:59:26.909448	Phó Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
thainp@vnu.edu.vn	Nguyễn	Phương Thái	t	$2b$10$LlJqwj/tOQOHx7I4RwS4T./gwOwGc/4uLDgawb4JxGTM836QyANBi		f		2021-05-02 15:04:06.252	\N	t	2021-05-02 08:04:06.339416	2021-05-02 08:04:06.339416	Phó Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
hieuvd@vnu.edu.vn	Võ	Đình Hiếu	t	$2b$10$1F4jxKmDTFnPrkmZVO/tL.ffyj//HD.YQooBoJi3T89sw67iXG1D6	E3 - Trường đại học Công Nghệ - DHQGHN	t		2021-05-02 14:41:16.193	\N	t	2021-05-02 07:41:16.290368	2021-05-02 07:41:16.290368	Tiến sĩ	Trưởng bộ môn	Không có chức vụ Đoàn thể
duonghn@vnu.edu.vn	Hoang	Minh Duong	t	$2b$10$uKZO45vw1BC89FV7aKl1xONg7uFiaixBkQgGDgFYc2j/X5eREwC8q	E3, 144 Xuan Thuy	t	Duong is a student in the Software Engineering Department	2021-04-29 15:25:00.856	\N	t	2021-04-21 17:15:22.827578	2021-04-21 17:15:22.827578	Giáo sư	Phó trưởng bộ môn	Student Union President
trinhlk@vnu.edu.vn	Le	Khanh Trinh	t	$2b$10$.8r1MSWQpyDi/e7jKkR2p.Rz5tkdd4UxGNlDLq2s2HrPYDrTVo7x.	E3, 144 Xuan Thuy, Cau Giay	f	Trinh is a researcher and lecturer at University of Engineering and Technology	2021-04-29 15:25:11.592	\N	t	2021-04-21 17:15:22.827571	2021-04-21 17:15:22.827571	Phó Giáo sư	Trưởng bộ môn	Secretary of Youth Union
admin@eprints.vnu.edu.vn	Admin	Eprints	t	$2b$10$3lAAoKsK0xSgjs4eyaDIAOyA6Fbhdqw/n//O..9Mx7CwS71jjp31G	\N	t	Super admin of Eprints	\N	\N	t	2021-04-21 13:59:18.329771	2021-04-21 13:59:18.329771	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
vietth@vnu.edu.vn	Tran	Hoang Viet	t	\N	\N	f	\N	\N	\N	f	2021-04-23 00:55:39.269784	2021-04-23 00:55:39.269784	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
gijun@korea.edu	Moon	Gi Jun	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:24:01.58515	2021-04-21 17:24:01.58515	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
lamnd@vnu.edu.vn	Nguyễn 	Đình Lãm	t	$2b$10$z5S3Ru4DkrGi60j7p/HFi.nyHyHu6tfR.ehPgNqA/zPx8OsZ.KFqO		f		2021-05-02 15:45:10.869	\N	t	2021-05-02 08:45:10.949048	2021-05-02 08:45:10.949048	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
trinhcd@vnu.edu.vn	Chử	Đức Trình	t	$2b$10$.9RTrC3vYfvRtrWmhDNRqOIehGYG.QZQWzCGsHFlIlROn1QzmvuMi		f		2021-05-02 17:41:16.702	\N	t	2021-05-02 10:41:16.815084	2021-05-02 10:41:16.815084	Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
hoangnn@vnu.edu.vn	Nguyễn 	Nam Hoàng	t	$2b$10$BqRA4MDBs40RQSlMwdSrl.fu1RUfMb2nBk1T.0zkBn/5G8KgwgbwS		f		2021-05-02 17:42:03.116	\N	t	2021-05-02 10:42:03.195498	2021-05-02 10:42:03.195498	Phó Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
trungnl@vnu.edu.vn	Nguyễn 	Linh Trung	t	$2b$10$lNWUXAQOa7QP1RfOcI0DhuC41LayvpUgnjCyJBAzCQZJ5GkHbEqrC		f		2021-05-02 17:42:50.735	\N	t	2021-05-02 10:42:50.818096	2021-05-02 10:42:50.818096	Phó Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
tutx@vnu.edu.vn	Trần 	Xuân Tú	t	$2b$10$qZjrVn017Ewgi8vQamLHAuEaLbjq4QB9pxp18Tbc.Z5H4KZ74bgyi		f		2021-05-02 17:48:55.316	\N	t	2021-05-02 10:48:55.401476	2021-05-02 10:48:55.401476	Phó Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
hungdv@vnu.edu.vn	Đặng	Văn Hưng	t	$2b$10$Gn8fMqEBdmKLTlORI0If4eBsliaU0HKLP9UJ5eCc0hKAy/16YXdbK	E3, 144 Xuan Thuy	f	VNU UET	2021-05-02 14:49:49.982	\N	t	2021-04-25 07:18:05.266737	2021-04-25 07:18:05.266737	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
longtq@vnu.edu.vn	Trần 	Quốc Long	t	$2b$10$I5v8rqsaxgf7GfCjsdVHLutFFpi.ELWh2p1UQK4E/i0hp7vsUWh8y		t		2021-05-02 14:58:19.986	\N	t	2021-05-02 07:58:20.070291	2021-05-02 07:58:20.070291	Tiến sĩ	Trưởng bộ môn	Phó Bí thư Đảng Uỷ
hanv@vnu.edu.vn	Nguyễn	Việt Hà	t	$2b$10$tOT12g/UBSyDXm4g74sltOmGRC69V0PgmzFaXV/KwGhOfqmTM0iu.	E3 Building, 144 Xuan Thuy Street, Cau Giay, Hanoi	f	Phó Giáo sư Nguyễn Việt Hà hiện là Hiệu trưởng Trường Đại học Công Nghệ, ĐHQGHN	2021-05-02 14:51:43.534	\N	t	2021-04-21 13:42:51.389733	2021-04-21 13:42:51.389733	Phó Giáo sư	Hiệu trưởng	Bí thư Đảng Uỷ
hoangta@vnu.edu.vn	Trương	Anh Hoàng	t	$2b$10$UzNT8Ie1y1yTfsi92BgyJOtAfCxS7WPPChz2TjkHSlQb//i91BnTa	E3 - Trường đại học Công Nghệ	f		2021-05-02 14:49:01.971	\N	t	2021-04-25 07:18:05.268165	2021-04-25 07:18:05.268165	Phó Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
cuonglb@vnu.edu.vn	Lê	Bá Cường	t	$2b$10$GsD6fBPBmn0eafZhL/T88O7bnN1GleOUq7SD8WzKl6Vnp04.n8PwG	E3, 144 Xuan Thuy	t	Cuong is a researcher at UET, VNU, Vietnam	2021-05-02 11:21:37.955	\N	f	2021-04-22 09:26:30.260881	2021-04-22 09:26:30.260881	Tiến sĩ	Không có chức vụ quản lý	Phó Chủ tịch Hội sinh viên
anhnd@vnu.edu.vn	Nguyễn	Đức Anh	t	$2b$10$WmoWyQB.VxUpWdg9hPy9NO5WZbTfHwmdPOCHGEEwLma.0SzW8tk8.	320 E3, 144 Xuan Thuy	f		2021-05-02 14:55:55.999	\N	t	2021-04-22 09:22:45.020613	2021-04-22 09:22:45.020613	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
hieupx@vnu.edu.vn	Phan	Xuân Hiếu	t	$2b$10$BWFUAV1yyg4NIcxBMSr3vuzZJccYT1otAcDaLqKdVBQ0CmKZLDNn2	\N	f	Phó Giáo sư Phan Xuân Hiếu là trưởng phòng thí nghiệm Công Nghệ Tri Thức	2021-05-02 11:21:31.325	\N	f	2021-04-22 22:58:16.546992	2021-04-22 22:58:16.546992	Phó Giáo sư	Trưởng khoa	Chủ tịch Hội sinh viên
huonggiangdt@vnu.edu.vn	Đỗ	Thị Hương Giang	t	$2b$10$5JkoVy/Ri/6CX9y8DFub9u9q1DUu5rPz6ZS9ivBOShVY3vp0UY3SO		t		2021-05-02 15:28:03.247	\N	t	2021-05-02 08:28:03.333021	2021-05-02 08:28:03.333021	Phó Giáo sư	Phó trưởng khoa	Không có chức vụ Đoàn thể
duongdt@vnu.edu.vn	Đinh	Triều Dương	t	$2b$10$20jlzozEiu2agvncymXL4OSKDnZrHIB1d4FY/aF3WExC2w0ZSP5SK		t		2021-05-02 15:48:16.356	\N	t	2021-05-02 08:48:16.445651	2021-05-02 08:48:16.445651	Tiến sĩ	Trưởng khoa	Không có chức vụ Đoàn thể
thanhvannt@vnu.edu.vn	Nguyễn	Thị Thanh Vân	t	$2b$10$41GUjBVrSshj0PgoQkfXce6y1FYBGJ7Sr56zkI4bCpRwkUDYBkcUe		f		2021-05-02 15:49:06.517	\N	t	2021-05-02 08:49:06.59949	2021-05-02 08:49:06.59949	Tiến sĩ	Phó trưởng khoa	Không có chức vụ Đoàn thể
vinhnv@vnu.edu.vn	Nguyễn	Văn Vinh	t	$2b$10$N/Vy54iqVdRWYLbKPvOSqeuWLTDXOTeIqQonYvU0yd7yAzjcSwC32		f		2021-05-02 15:05:36.548	\N	t	2021-05-02 08:05:36.631409	2021-05-02 08:05:36.631409	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
chauttm@vnu.edu.vn	Trần	Thị Minh Châu	t	$2b$10$PUUKdYjLYdofhyzvvaumt.FEZqm41Gr7rgCnaKFqe/3xyYtNUfA/y		f		2021-05-02 15:07:13.369	\N	t	2021-05-02 08:07:13.45416	2021-05-02 08:07:13.45416	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
dinhnn@vnu.edu.vn	Nguyễn	Năng Định	t	$2b$10$V/EiuKRsRbYfH3ufYgayl.44lhqcf5RIruj2O.Ie/bS9TONkhDlDe		f		2021-05-02 15:30:58.74	\N	t	2021-05-02 08:30:58.822364	2021-05-02 08:30:58.822364	Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
khoatv@vnu.edu.vn	Trần	Việt Khoa	t	\N	\N	f	\N	\N	\N	f	2021-05-02 11:18:51.933651	2021-05-02 11:18:51.933651	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
vuta@vnu.edu.vn	Trịnh	Anh Vũ	t	$2b$10$7cxdk4qrFQ8CSD2nEW/OmOxDpIeoysEFeK/EfSYL3wJY8ana45cJC		f		2021-05-02 17:50:55.9	\N	t	2021-05-02 10:50:55.984468	2021-05-02 10:50:55.984468	Phó Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
dungnv@vnu.edu.vn	Nguyễn	Việt Dũng	t	$2b$10$sEhh88BloqW9YwAThbkJku8fuu.zwM0H.0VHVbXAXnwr2x3da2ifO		f		2021-05-02 17:51:38.614	\N	t	2021-05-02 10:51:38.694977	2021-05-02 10:51:38.694977	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
ducnd@vnu.edu.vn	Nguyễn	Đình Đức	t	$2b$10$KyP6TS/yQJH1hBW0.Jzs6Omo1D4pqWlXRGpinikzWnuS0kan/Eb5G		f		2021-05-02 17:53:49.111	\N	t	2021-05-02 10:53:49.190466	2021-05-02 10:53:49.190466	Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
badt@vnu.edu.vn	Đặng 	Thế Ba	t	$2b$10$.nj3Ilxm6R.kNWr5OhaoXufCUWsFqvS13w.GTfNNvmoM17NdnAei6		f		2021-05-02 17:54:29.447	\N	t	2021-05-02 10:54:29.531767	2021-05-02 10:54:29.531767	Phó Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
thangpm@vnu.edu.vn	Phạm 	Mạnh Thắng	t	$2b$10$fMk1ZufhqVsU.gLEOx3.GuVOLagesqAjMgNtGWolJEt2G/iFtvdrO		f		2021-05-02 17:55:08.512	\N	t	2021-05-02 10:55:08.596952	2021-05-02 10:55:08.596952	Phó Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
hiepdt@vnu.edu.vn	Đinh	Trần Hiệp	t	$2b$10$egACLyhzqfWLdbxYNU..A..jztv5pV4zNIGsJ5IAeIKf1JnYIytKa		f		2021-05-02 17:55:53.709	\N	t	2021-05-02 10:55:53.798313	2021-05-02 10:55:53.798313	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
hungtc@vnu.edu.vn	Trần 	Cường Hưng	t	$2b$10$WvsPkiKQ7OaCu68/I3T75Ow.JqkX21sHvrAIKYQqn7D6d8A.xqXye		f		2021-05-02 17:56:30.03	\N	t	2021-05-02 10:56:30.11147	2021-05-02 10:56:30.11147	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
linhnn@vnu.edu.vn	Nguyễn	Ngọc Linh	t	$2b$10$kdIeaTZYP1D8D1Pu15rOPudURx5OpXZLrRVdEk4rphzx4k3Desrsq		f		2021-05-02 17:57:13.712	\N	t	2021-05-02 10:57:13.802111	2021-05-02 10:57:13.802111	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
hamlh@vnu.edu.vn	Lê	Huy Hàm	t	$2b$10$UbdFd1M7Yteel/Gwpm6IaOQh4xd7jkDUjqSz09e9clPjprOnv3fdS		f		2021-05-02 17:59:30.717	\N	t	2021-05-02 10:59:30.799888	2021-05-02 10:59:30.799888	Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
hienlt@vnu.edu.vn	Lê	Thị Hiên	t	$2b$10$bhDtUaP/56XIToBEEFOVGOzn39taNdxmrDy0.WRXPK2W2bOOvVj2C		f		2021-05-02 18:02:03.826	\N	t	2021-05-02 11:02:03.907903	2021-05-02 11:02:03.907903	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
khanhnl@vnu.edu.vn	Nguyễn	Lê Khanh	t	$2b$10$SVoinMjv5IWtXgqpqacMC.FuE/PY1NzfWda.aViZGUpPAE44C5XrS		f		2021-05-02 18:02:39.2	\N	t	2021-05-02 11:02:39.282878	2021-05-02 11:02:39.282878	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
khoatd@vnu.edu.vn	Trần 	Đăng Khoa	t	$2b$10$uNjRD6OtHJTnCyW16pWwDemfzcG2b2O3DrjH1AL.5nDHqq0bY5ymC		f		2021-05-02 18:03:33.449	\N	t	2021-05-02 11:03:33.528592	2021-05-02 11:03:33.528592	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
hungpn@vnu.edu.vn	Phạm	Ngọc Hùng	t	$2b$10$lD8WzqEt7UbdoecmYvcAver5zFXgUyxl5BkYkTHi8hB4CVH32Maby	144 Xuan Thuy	f	Phó Giáo sư Phạm Ngọc Hùng hiện là Phó trưởng Khoa Công Nghệ Thông Tin, trường Đại học Công Nghệ, ĐHQGHN. 	2021-05-09 16:55:42.196	\N	t	2021-04-21 13:17:45.459501	2021-04-21 13:17:45.459501	Phó Giáo sư	Phó trưởng khoa	Bí thư Chi Bộ
quyenht@vnu.edu.vn	Hà	Thị Quyến	t	$2b$10$IjyktecaXrPv1XOrfIycpenQpcjJdKRRVdU9wXLVlUakdIMZr6.zq		f		2021-05-09 02:41:33.32	\N	t	2021-05-08 19:41:33.450644	2021-05-08 19:41:33.450644	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
trienpm@vnu.edu.vn	Phạm	Minh Triển	t	$2b$10$3l1hzVUYAQg9xl6TE1/46.jkt8cHAeKg1AM9LkmbCOBQWIZ4zIOLi		f		2021-05-09 02:43:06.482	\N	t	2021-05-08 19:43:06.562687	2021-05-08 19:43:06.562687	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
anld@vnu.edu.vn	Lê	Đình An	t	$2b$10$a.lxmwTsN.ivjguqdwpaTuad4LZEAbXRV.V2OBYf4CxQr5svVmivq		f		2021-05-09 02:47:58.974	\N	t	2021-05-08 19:47:59.053867	2021-05-08 19:47:59.053867	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
cuonghm@vnu.edu.vn	Hà 	Minh Cường	t	$2b$10$eRyAQlpAe7xGrIzaPOBnVuF6hdDIGtC5vFmMF25O2NwD90mrriS.S		f		2021-05-09 02:48:45.373	\N	t	2021-05-08 19:48:45.457423	2021-05-08 19:48:45.457423	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
khoiln@vnu.edu.vn	Lê	Nguyên Khôi	t	$2b$10$C1AU21IVHN5DXFsgtvQAcuYFHjslibkVn7MwWGINB.eAnx381Q6ee		f		2021-05-02 15:04:54.443	\N	t	2021-05-02 08:04:54.530984	2021-05-02 08:04:54.530984	Tiến sĩ	Không có chức vụ quản lý	Bí thư Chi Bộ
tokuyama@jaist.ac.jp	Tokuyama	Takeshi	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:29:27.243709	2021-04-23 01:29:27.243709	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
alice.hutchings@cst.cam.ac.uk	Alice	Hutchings	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:36:37.176516	2021-04-21 17:36:37.176516	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
ben.collier@cst.cam.ac.uk	Collier	Ben	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:36:37.176743	2021-04-21 17:36:37.176743	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
damhs@vnu.edu.vn	Ho	Sy Dam	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:35:15.854129	2021-04-23 01:35:15.854129	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
giapnv@vnu.edu.vn	Nguyen	Van Giap	t	\N	\N	f	\N	\N	\N	f	2021-04-22 22:58:16.542623	2021-04-22 22:58:16.542623	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
hienda@vnu.edu.vn	Dao	Anh Hien	t	\N	\N	f	\N	\N	\N	f	2021-04-25 06:17:03.06111	2021-04-25 06:17:03.06111	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
nguyetna@vnu.edu.vn	Nguyen	Anh Nguyet	t	\N	\N	f	\N	\N	\N	f	2021-04-25 06:17:03.061621	2021-04-25 06:17:03.061621	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
nhathn@vnu.edu.vn	Hoàng	Nam Nhật	t	$2b$10$H3y4vuzBK58bWQPlY8ndsOu0rCYtiqwuHcQqYiLQOQyjMxQgU2ucO		f		2021-05-02 15:38:20.162	\N	t	2021-05-02 08:38:20.244924	2021-05-02 08:38:20.244924	Giáo sư	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
cuongdn@vnu.edu.vn	Nguyễn	Đức Cường	t	$2b$10$l6OqLIz5cj1.o/t24XeC7ufYkrZxLKP3NkqYXPpIkMzCQoy6QKwPi		f		2021-05-02 15:44:17.221	\N	t	2021-05-02 08:44:17.303854	2021-05-02 08:44:17.303854	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
ildiko.pete@cst.cam.ac.uk	Pete	Ildiko	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:36:37.173674	2021-04-21 17:36:37.173674	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
thangnt@vnu.edu.vn	Nguyen	Truong Thang	t	$2b$10$KKlPaRARzkbhxNsqi3H1.ur47Mi0O9EuLWSAV83WTO7i16CGfDrpm	E3, 144 Xuan Thuy	f	Thang is a student in Software Engineering Department	2021-04-29 15:24:34.596	\N	t	2021-04-21 17:56:32.747033	2021-04-21 17:56:32.747033	Giảng viên	Trưởng bộ môn	Student Union President
jack.hughes@cst.cam.ac.uk	Hughes	Jack	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:36:37.175908	2021-04-21 17:36:37.175908	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
yiting.chua@cst.cam.ac.uk	Chua	Yi Ting	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:36:37.177818	2021-04-21 17:36:37.177818	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
ilia.shumailov@cst.cam.ac.uk	Ilia 	Shumailov	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:36:37.17422	2021-04-21 17:36:37.17422	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
mizuhito@jaist.ac.jp	Ogawa	Mizuhito	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:27:36.611288	2021-04-21 17:27:36.611288	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
inho@yonsei.ac.kr	Choi	Inho	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:24:01.584375	2021-04-21 17:24:01.584375	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
dungdv@vnu.edu.vn	Dương	Việt Dũng	t	$2b$10$f.TBWzLmFAKo3vhr1A9yeeLKAxKbNd0odDtwiZE1aqFaAnhKlnSnW		f		2021-05-09 02:49:40.276	\N	t	2021-05-08 19:49:40.369321	2021-05-08 19:49:40.369321	Tiến sĩ	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
hanhdd@vnu.edu.vn	Đặng	Đức Hạnh	t	\N	\N	f	\N	\N	\N	f	2021-05-02 11:29:58.92549	2021-05-02 11:29:58.92549	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
tuyentd@vnu.edu.vn	Tạ	Đức Tuyên	t	\N	\N	f	\N	\N	\N	f	2021-05-02 11:51:14.946831	2021-05-02 11:51:14.946831	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
kaothanthong@tohoku.ac.jp	Kaothanthong	Natsuda	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:29:27.242358	2021-04-23 01:29:27.242358	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
tuct@vnu.edu.vn	Nguyen	Cam Tu	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:29:27.241735	2021-04-23 01:29:27.241735	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
muoitd@comp.nus.edu.sg	Tran	Duc Muoi	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:24:01.586292	2021-04-21 17:24:01.586292	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
kangms@kaist.ac.uk	Kang	Min Suk	t	\N	\N	f	\N	\N	\N	f	2021-04-21 17:24:01.58406	2021-04-21 17:24:01.58406	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
susumu@tokoku.ac.jp	Horiguchi	Susumu	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:24:04.877079	2021-04-23 01:24:04.877079	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
anh.vu@cst.cam.ac.uk	Vu	Anh V.	t	$2b$10$al5BHvX/gK.hDcE6CuWKVePZtzoS0E/NQA3bQ1KOl0IIkGPPaWY.a		f		2021-05-01 15:00:47.706	\N	f	2021-04-21 17:24:01.586336	2021-04-21 17:24:01.586336	Giảng viên	Phó trưởng khoa	Secretary of Youth Union
minhnl@jaist.ac.jp	Nguyen	Le Minh	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:24:04.876181	2021-04-23 01:24:04.876181	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
katayama@jaist.ac.jp	Katayama	Takuya	t	\N	\N	f	\N	\N	\N	f	2021-04-21 13:17:45.460939	2021-04-21 13:17:45.460939	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
aoki@jaist.ac.jp	Aoki	Toshiaki	t	\N	\N	f	\N	\N	\N	f	2021-04-21 13:17:45.460685	2021-04-21 13:17:45.460685	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
daovt@vnu.edu.vn	Vũ Thị 	Đào	t	\N	\N	f	\N	\N	\N	f	2021-04-21 13:42:51.38906	2021-04-21 13:42:51.38906	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
okkoko@dfvv.com	kokoko	okok	t	$2b$10$sk4Ykd1r.BZthLucpknwKeGq0VnFthC7frJyHTMEvIcNm.5K2JVum		f		2021-05-02 11:10:35.556	\N	f	2021-05-02 04:09:16.595116	2021-05-02 04:09:16.595116	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
minhld@vnu.edu.vn	Lê	Đức Minh	t	\N	\N	f	\N	\N	\N	f	2021-04-22 22:58:16.545377	2021-04-22 22:58:16.545377	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
anhnv@vnu.edu.vn	Nguyen	Viet Anh	t	\N	\N	f	\N	\N	\N	f	2021-04-23 01:35:15.852959	2021-04-23 01:35:15.852959	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
tuanbm@vnu.edu.vn	Bùi 	Minh Tuấn	t	\N	\N	f	\N	\N	\N	f	2021-05-02 11:51:15.144645	2021-05-02 11:51:15.144645	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
mmm@vnu.edu.vn	mmm	mm	t	\N	\N	f	\N	\N	\N	f	2021-05-09 11:09:50.329023	2021-05-09 11:09:50.329023	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
duongtd@vnu.edu.vn	Trần Đình	Dương	t	\N	\N	f	\N	\N	\N	f	2021-05-09 15:59:34.64773	2021-05-09 15:59:34.64773	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
quangtn@vnu.edu.vn	Nguyễn Trung	Quang	t	\N	\N	f	\N	\N	\N	f	2021-05-09 15:53:42.673413	2021-05-09 15:53:42.673413	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
tungnd@vnu.edu.vn	Nguyễn Duy 	Tùng	t	\N	\N	f	\N	\N	\N	f	2021-05-09 15:59:34.651074	2021-05-09 15:59:34.651074	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
sonnv@vnu.edu.vn	Nguyễn Văn	Sơn	t	\N	\N	f	\N	\N	\N	f	2021-05-09 16:11:14.079105	2021-05-09 16:11:14.079105	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
			t	\N	\N	f	\N	\N	\N	f	2021-04-21 13:17:45.461383	2021-04-21 13:17:45.461383	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
chill@vnu.edu.vn	Luan Le	Chi	t	\N	\N	f	\N	\N	\N	f	2021-05-09 16:05:30.083005	2021-05-09 16:05:30.083005	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
trungnq@vnu.edu.vn	Nguyễn Quang	Trung	t	\N	\N	f	\N	\N	\N	f	2021-05-09 16:17:05.482765	2021-05-09 16:17:05.482765	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
nhanlt@vnu.edu.vn	Lương Thanh	Nhàn	t	\N	\N	f	\N	\N	\N	f	2021-05-09 18:05:38.36838	2021-05-09 18:05:38.36838	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
khanhtv@vnu.edu.vn	Tô Văn 	Khánh	t	\N	\N	f	\N	\N	\N	f	2021-05-09 18:05:38.373531	2021-05-09 18:05:38.373531	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
thuantn@vnu.edu.vn	Trương 	Ninh Thuận	t	\N	\N	f	\N	\N	\N	f	2021-05-09 18:05:38.373898	2021-05-09 18:05:38.373898	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
trangnt@vnu.edu.vn	Nguyễn Thu	Trang	t	\N	\N	f	\N	\N	\N	f	2021-05-09 10:33:05.944397	2021-05-09 10:33:05.944397	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
huen@vnu.edu.vn	Nguyễn	Huế	t	\N	\N	f	\N	\N	\N	f	2021-05-09 10:33:05.9444	2021-05-09 10:33:05.9444	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
cuongbq@vnu.edu.vn	Bùi Quang	Cường	t	\N	\N	f	\N	\N	\N	f	2021-05-09 10:33:05.944518	2021-05-09 10:33:05.944518	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
huongtn@vnu.edu.vn	Tran	Nguyen Huong	t	\N	\N	f	\N	\N	\N	f	2021-05-09 11:56:53.466582	2021-05-09 11:56:53.466582	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
khadm@vnu.edu.vn	Do	Minh Kha	t	\N	\N	f	\N	\N	\N	f	2021-05-09 11:56:53.467322	2021-05-09 11:56:53.467322	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
hoangtv@vnu.edu.vn	Trần Việt	Hoàng	t	\N	\N	f	\N	\N	\N	f	2021-05-09 10:26:05.65233	2021-05-09 10:26:05.65233	Giảng viên	Không có chức vụ quản lý	Không có chức vụ Đoàn thể
\.


--
-- Name: publication_id_seq; Type: SEQUENCE SET; Schema: public; Owner: suongsun
--

SELECT pg_catalog.setval('public.publication_id_seq', 52, true);


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

