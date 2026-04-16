-- MySQL dump 10.13  Distrib 8.0.42, for Win64 (x86_64)
--
-- Host: localhost    Database: jossiautocare
-- ------------------------------------------------------
-- Server version	5.7.24

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8mb4 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Current Database: `jossiautocare`
--

CREATE DATABASE /*!32312 IF NOT EXISTS*/ `jossiautocare` /*!40100 DEFAULT CHARACTER SET utf8 */;

USE `jossiautocare`;

--
-- Table structure for table `common_services`
--

DROP TABLE IF EXISTS `common_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `common_services` (
  `service_id` int(11) NOT NULL AUTO_INCREMENT,
  `service_name` varchar(255) NOT NULL,
  `service_description` text,
  PRIMARY KEY (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `common_services`
--

LOCK TABLES `common_services` WRITE;
/*!40000 ALTER TABLE `common_services` DISABLE KEYS */;
INSERT INTO `common_services` VALUES (1,'Oil change updated','Some description about the oil change updated'),(5,'Spark plug replacement updated','Update spark plugs are a small part that can cause huge problems. Their job is to ignite the fuel in your engine, helping it start'),(6,'Fuel Cap tightening','Loose fuel caps are actually a main reason why the \"check engine\" light in a car comes on.'),(7,'Oxygen Sensor replacement','Oxygen sensors measure the concentration of oxygen in the exhaust gabs in order to optimize engine performance and emissions.'),(8,'Brake work','We all know why brake work is important, especially because one quarter of all Canadian car accidents are caused by a failure to stop.'),(9,'Tire repairs and changes','Without good, inflated tires, you loose speed, control, and fuel efficiency, hence the need to get them patched if there\'s a leak (for example, if you run over a nail), or replaced if they\'re too worn.'),(10,'The Ignition System','A car\'s ignition system includes its battery, starter, and the ignition itself.');
/*!40000 ALTER TABLE `common_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `company_roles`
--

DROP TABLE IF EXISTS `company_roles`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `company_roles` (
  `company_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `company_role_name` varchar(255) NOT NULL,
  PRIMARY KEY (`company_role_id`),
  UNIQUE KEY `company_role_name` (`company_role_name`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `company_roles`
--

LOCK TABLES `company_roles` WRITE;
/*!40000 ALTER TABLE `company_roles` DISABLE KEYS */;
INSERT INTO `company_roles` VALUES (3,'Admin'),(1,'Employee'),(2,'Manager');
/*!40000 ALTER TABLE `company_roles` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_identifier`
--

DROP TABLE IF EXISTS `customer_identifier`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_identifier` (
  `customer_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_email` varchar(255) NOT NULL,
  `customer_phone_number` varchar(255) NOT NULL,
  `customer_added_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `customer_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`customer_id`),
  UNIQUE KEY `customer_email` (`customer_email`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_identifier`
--

LOCK TABLES `customer_identifier` WRITE;
/*!40000 ALTER TABLE `customer_identifier` DISABLE KEYS */;
INSERT INTO `customer_identifier` VALUES (1,'test@test.com','555-555-8888','2026-04-07 11:48:27','56b4e3ac-1e26-4efd-b677-6bbd23ebd221'),(2,'jossi@gmail.com','0909090909','2026-04-02 11:05:14','5ca59dde-88b8-4090-8e8d-bcbaa7dbcc34'),(3,'joss@gmail.com','0909090909','2026-04-02 11:06:21','50e7f87c-e28e-461c-b10d-5ed8dc53984c'),(4,'jo@gmail.com','0909090909','2026-04-02 11:35:50','f9334143-9f24-4ca5-b9bb-7626b3566da0'),(5,'h_man@gmail.com','0989898989','2026-04-02 11:41:58','fe955832-358e-46af-ab86-896f9fdf18ca'),(6,'customer@gmail.com','0924242424','2026-04-02 12:03:14','fe6822ca-2fb9-4671-986c-86a1625a4cc5'),(7,'w@gmail.com','0988888888','2026-04-04 23:16:03','dee92301-5982-4857-ab4f-6b4fe6ce2d18'),(8,'r@gmail.com','0912345445','2026-04-04 23:17:51','613c4eee-debf-4c4f-b348-0913cafa8297'),(9,'Joo@gmail.com','0988888888','2026-04-07 12:42:05','f341a58c-6431-4b2a-8a8c-45d15bcc6020'),(10,'g@gmail.com','0967676767','2026-04-04 23:22:29','ada6dafd-0e1a-4769-9609-f2437e88be91'),(11,'h@gmail.com','0956565656','2026-04-04 23:23:47','0f65da58-7570-4d34-b8c2-9f42349aadc0'),(12,'a@gmail.com','0912121212','2026-04-04 23:24:53','aef74c62-917e-45fe-9772-f81399780e5e'),(13,'d@gmail.com','0913131313','2026-04-07 12:40:58','309d151d-d3af-4b6d-8ae5-5355d4d89a98'),(14,'test@gmail.com','0945454545','2026-04-04 23:26:58','9bfbdac8-13e1-497c-b440-b435537afe71'),(15,'test2@gmail.com','0934343434','2026-04-04 23:27:56','c2f8be63-6113-4196-a695-4361e73aa53b'),(16,'test3@gmail.com','0944444444','2026-04-04 23:33:18','9eb47b15-961e-48cd-9e8a-c2281ce4a01d'),(17,'test4@gmail.com','0978787878','2026-04-05 00:29:58','0198e357-3c23-4271-8cbb-431b98c7ec80'),(18,'test5@gmail.com','0965656565','2026-04-06 21:41:31','77b159c5-adde-462a-9072-a31de021e84d'),(19,'employee2@gmail.com','0978787878','2026-04-13 08:12:31','c41c90fa-4435-45c4-a261-7f85f16b0bad'),(20,'test6@gmail.com','0923232323','2026-04-13 08:17:43','ca1c554e-ef99-4c03-8cd7-b2b19b234237'),(21,'test7@gmail.com','0932323232','2026-04-13 08:46:46','bd267fb2-ad61-4484-bbdd-a5da6aff7d3a'),(22,'test8@gmail.com','0943434343','2026-04-13 08:52:10','2eb19437-cbeb-4418-9cbd-d9161429fc9a');
/*!40000 ALTER TABLE `customer_identifier` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_info`
--

DROP TABLE IF EXISTS `customer_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_info` (
  `customer_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `customer_first_name` varchar(255) NOT NULL,
  `customer_last_name` varchar(255) NOT NULL,
  `active_customer_status` int(11) NOT NULL,
  PRIMARY KEY (`customer_info_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `customer_info_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_info`
--

LOCK TABLES `customer_info` WRITE;
/*!40000 ALTER TABLE `customer_info` DISABLE KEYS */;
INSERT INTO `customer_info` VALUES (1,1,'Test Updated','Test Updated',0),(2,2,'joss','Az',1),(3,3,'jos','Az',1),(4,4,'Joo','Joo',1),(5,5,'Hman','H',1),(6,6,'Cust','Omer',1),(7,7,'Www','W',1),(8,8,'Rrrr','R',1),(9,9,'test2','Update',0),(10,10,'Ggg','G',1),(11,11,'hman','h',1),(12,12,'Abb','A',1),(13,13,'Test','Update',0),(14,14,'Test1','Test1',1),(15,15,'Test2','Test2',1),(16,16,'Test3','Test',1),(17,17,'Test4','Test4',1),(18,18,'Test5','Test5',1),(19,19,'Employee2','Employee@',1),(20,20,'Test6','Test6',1),(21,21,'Test7','Test7',1),(22,22,'Test8','Test8',1);
/*!40000 ALTER TABLE `customer_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `customer_vehicle_info`
--

DROP TABLE IF EXISTS `customer_vehicle_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `customer_vehicle_info` (
  `vehicle_id` int(11) NOT NULL AUTO_INCREMENT,
  `customer_id` int(11) NOT NULL,
  `vehicle_year` int(11) NOT NULL,
  `vehicle_make` varchar(255) NOT NULL,
  `vehicle_model` varchar(255) NOT NULL,
  `vehicle_type` varchar(255) NOT NULL,
  `vehicle_mileage` int(11) NOT NULL,
  `vehicle_tag` varchar(255) NOT NULL,
  `vehicle_serial` varchar(255) NOT NULL,
  `vehicle_color` varchar(255) NOT NULL,
  PRIMARY KEY (`vehicle_id`),
  KEY `customer_id` (`customer_id`),
  CONSTRAINT `customer_vehicle_info_ibfk_1` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier` (`customer_id`)
) ENGINE=InnoDB AUTO_INCREMENT=14 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `customer_vehicle_info`
--

LOCK TABLES `customer_vehicle_info` WRITE;
/*!40000 ALTER TABLE `customer_vehicle_info` DISABLE KEYS */;
INSERT INTO `customer_vehicle_info` VALUES (1,1,2023,'Tesla Updated','Model S Updated','Sedan Updated',10001,'9890Ab2 Updated','458008887783543435553434 Updated','Silver Updated'),(2,1,2022,'Tesla','Model S','Sedan',10000,'9890Ab2','458008887783543435553434','Silver'),(3,1,2024,'Tesla','model 3','saden',10001,'9890Ab5','458008887783543435553435','Silver'),(4,2,2025,'Tesla','model 3','saden',10001,'9890Ab4','458008887783543435553435','Silver'),(5,18,2010,'tesla update','BYD update','model update',12345,'ET0007','123456rewq2345675432erty','silver'),(6,18,2026,'Tesla','BYD','Electric',100220,'ET00002','21345rewq3456754','black'),(7,18,2025,'Tesla','Nissan','rangerover',10234,'ET0003','12345weghj3456yt21340987','black'),(8,17,2023,'Tesla','model 2','V8',12097,'AA0001','2345wewr5432345876','black'),(9,2,2025,'Tesla','model 3','saden',10001,'9890A','458008887783543435553435','Silver'),(10,22,2024,'Tesla','model 2','saden',205741,'ET0008','458008887783543435553435','Black'),(11,20,2025,'BYD','X7','Toyota',12365432,'ET0009','234rew2345','White'),(12,20,2021,'Tesla','model 3','V8',123456654,'ET0011','wert654322345','red'),(13,20,2019,'BYD','model 2','Toyota',123478654,'ET0012','wer6543wer','red');
/*!40000 ALTER TABLE `customer_vehicle_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee`
--

DROP TABLE IF EXISTS `employee`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee` (
  `employee_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_email` varchar(255) NOT NULL,
  `active_employee` int(11) NOT NULL,
  `added_date` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`employee_id`),
  UNIQUE KEY `employee_email` (`employee_email`)
) ENGINE=InnoDB AUTO_INCREMENT=43 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee`
--

LOCK TABLES `employee` WRITE;
/*!40000 ALTER TABLE `employee` DISABLE KEYS */;
INSERT INTO `employee` VALUES (1,'jossi@gmail.com',0,'2026-04-01 00:46:02'),(3,'w@gmail.com',1,'2026-03-27 15:01:12'),(4,'y@gmail.com',1,'2026-03-27 20:41:19'),(12,'y1@gmail.com',1,'2026-03-27 20:59:48'),(15,'y0@gmail.com',1,'2026-03-27 21:06:24'),(17,'y2@gmail.com',1,'2026-03-27 21:10:26'),(19,'y3@gmail.com',1,'2026-03-27 21:14:05'),(32,'joss@gmail.com',0,'2026-04-01 13:38:16'),(33,'joseph@gmail.com',1,'2026-03-28 23:42:20'),(34,'employee@gmail.com',1,'2026-03-29 00:54:47'),(35,'manager@gmail.com',1,'2026-03-29 00:55:54'),(37,'customer@gmail.com',1,'2026-03-29 13:28:17'),(38,'admin@gmail.com',1,'2026-03-29 13:29:47'),(39,'customer1@gmail.com',1,'2026-03-29 13:33:04'),(40,'hman@gmail.com',1,'2026-04-01 21:24:27'),(41,'jossii@gmail.com',0,'2026-04-01 23:45:16'),(42,'jossy@gmail.com',1,'2026-04-02 10:21:43');
/*!40000 ALTER TABLE `employee` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_info`
--

DROP TABLE IF EXISTS `employee_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_info` (
  `employee_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `employee_first_name` varchar(255) NOT NULL,
  `employee_last_name` varchar(255) NOT NULL,
  `employee_phone` varchar(255) NOT NULL,
  PRIMARY KEY (`employee_info_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `employee_info_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_info`
--

LOCK TABLES `employee_info` WRITE;
/*!40000 ALTER TABLE `employee_info` DISABLE KEYS */;
INSERT INTO `employee_info` VALUES (1,1,'Test Updated','Test Updated','555-555-6666'),(4,12,'Jos','Az','0925555555'),(5,15,'Joss','Az','0925555555'),(6,17,'Joss','Az','0925555555'),(7,19,'Joss','Az','0925555555'),(8,32,'Jossi','Jossi','0921212121'),(9,33,'Joseph','Az','0925555555'),(10,34,'Employee','Employee','0912121212'),(11,35,'Manager','Manager','0913131313'),(13,37,'Customer','Customer','0914141414'),(14,38,'Joseph','Az','0923232323'),(15,39,'Customer','Customer','0910101010'),(16,40,'Hman','man','0923232323'),(17,41,'Jos','Jo','0987878787'),(18,42,'Yosef','Azeneg','555-555-5555');
/*!40000 ALTER TABLE `employee_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_pass`
--

DROP TABLE IF EXISTS `employee_pass`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_pass` (
  `employee_pass_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `employee_password_hashed` varchar(255) NOT NULL,
  PRIMARY KEY (`employee_pass_id`),
  KEY `employee_id` (`employee_id`),
  CONSTRAINT `employee_pass_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_pass`
--

LOCK TABLES `employee_pass` WRITE;
/*!40000 ALTER TABLE `employee_pass` DISABLE KEYS */;
INSERT INTO `employee_pass` VALUES (1,1,'$2b$10$ExN9Sak9izKj.B72He4l9OOWfeUZJGTELAtXZSEd6FfkbZeErOANe'),(4,12,'$2b$10$hqTRiE2urrQP8BW5xBUIz.5gvQY.HRYqcL.UQqn/ecEgjjlSAsw4u'),(5,15,'$2b$10$M.H9ySEDLeArbTB2rsUjteVQ3.LoXdbXFsjnTH7mi.FcCCYwj4VFm'),(6,17,'$2b$10$ML1Tl0F/vTa5uE16sJrCCOD5MoKQ8Rp1AvDMCEV4VHF3uWcHBaxye'),(7,19,'$2b$10$Ts5LV.MQWT2TwoXQTdF4cOiesgt7bsLTliRcb2yzVTmN1w9NPnTUq'),(8,32,'$2b$10$bYVxB0CQq8TuPcPi4yhJ1eYUS4b2tikhlWIO8p4K4IoWrmr9.nhNe'),(9,33,'$2b$10$Qx/852Jor6pjr/rpWsVN/emSQHE3msRO2VTGg2fvVwBZKBxE1gjvW'),(10,34,'$2b$10$XvwRkuq7Nchdfpg2D2yZGOyCmKvvSi87j.kBgK5ad12gCDyFFjOfq'),(11,35,'$2b$10$6K5Im.fxvD8XY2kWV5o4YOBt.v7CMaxLMbhCt39FqFihCjHh25r8m'),(13,37,'$2b$10$A5HIv07NQUdSU32MM64SEO8AsSu0LC9Dk9dKd/CsVnLuk/o.s./9e'),(14,38,'$2b$10$wqy064m0qEvnWKWyco8SeOedfFzSx7irOcoEpGm2.0zStk41gHWW.'),(15,39,'$2b$10$7Z4E8KjSjpBt8uNtSBufNujjsjXN0B3Ts6pFGdxpCxdx.KTy4fbjW'),(16,40,'$2b$10$bMHA.fyVmGEyXrjvzXit9uLxMndInDtCEwMjWShX8411Jbf/ihF1W'),(17,41,'$2b$10$qbNDLRU2ee24TFO1z1PvzOyMAcxFny/oDdkmfYKmr2oCcB.CytvM.'),(18,42,'$2b$10$fGhW1bKm.JRqtaNUhjLbyetXNOXYq5RQ5fP/Dd7HLD9pAkK8dBJDm');
/*!40000 ALTER TABLE `employee_pass` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `employee_role`
--

DROP TABLE IF EXISTS `employee_role`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `employee_role` (
  `employee_role_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `company_role_id` int(11) NOT NULL,
  PRIMARY KEY (`employee_role_id`),
  KEY `employee_id` (`employee_id`),
  KEY `company_role_id` (`company_role_id`),
  CONSTRAINT `employee_role_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `employee_role_ibfk_2` FOREIGN KEY (`company_role_id`) REFERENCES `company_roles` (`company_role_id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `employee_role`
--

LOCK TABLES `employee_role` WRITE;
/*!40000 ALTER TABLE `employee_role` DISABLE KEYS */;
INSERT INTO `employee_role` VALUES (1,1,3),(4,12,1),(5,15,3),(6,17,3),(7,19,3),(8,32,3),(9,33,3),(10,34,1),(11,35,2),(14,38,3),(15,40,3),(16,41,1),(17,42,3);
/*!40000 ALTER TABLE `employee_role` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_info`
--

DROP TABLE IF EXISTS `order_info`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_info` (
  `order_info_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `order_total_price` int(11) NOT NULL,
  `estimated_completion_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `completion_date` datetime DEFAULT NULL,
  `additional_request` text,
  `notes_for_internal_use` text,
  `notes_for_customer` text,
  `additional_requests_completed` int(11) NOT NULL,
  PRIMARY KEY (`order_info_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_info_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_info`
--

LOCK TABLES `order_info` WRITE;
/*!40000 ALTER TABLE `order_info` DISABLE KEYS */;
INSERT INTO `order_info` VALUES (1,1,0,'2023-04-28 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(2,2,0,'2023-04-28 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(3,3,0,'2023-04-28 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(4,7,0,'2026-04-28 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(5,8,0,'2026-04-28 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(6,9,0,'2026-05-23 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(7,10,0,'2026-05-23 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(8,11,0,'2026-05-23 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(9,12,0,'2026-05-23 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(10,13,0,'2026-05-23 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(11,14,0,'2026-06-23 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(12,15,0,'2026-06-23 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(13,22,200,'2026-06-23 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(14,24,300,'2026-04-14 22:37:37',NULL,'nothing',NULL,NULL,0),(15,25,400,'2026-04-21 09:00:00','2026-04-21 21:00:00','some thing',NULL,NULL,0),(16,26,600,'2026-06-23 18:27:02',NULL,'Some description about the order',NULL,NULL,0),(17,27,150,'2026-04-16 21:00:00','2026-04-14 21:00:00','nothing',NULL,NULL,0),(18,28,340,'2026-04-18 12:30:00','2026-04-14 21:00:00','we',NULL,NULL,0),(19,29,702,'2026-04-20 21:00:00','2026-04-15 21:00:00','weqrtredt',NULL,NULL,0),(20,30,702,'2026-04-15 21:00:00','2026-04-16 21:00:00','weqrtredt',NULL,NULL,0),(21,31,40,'2026-04-19 21:00:00','2026-04-21 21:00:00','wqrtyruj',NULL,NULL,0),(22,32,1000,'2026-04-16 21:00:00','2026-04-15 21:00:00','something',NULL,NULL,0);
/*!40000 ALTER TABLE `order_info` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_services`
--

DROP TABLE IF EXISTS `order_services`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_services` (
  `order_service_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `service_completed` int(11) NOT NULL,
  PRIMARY KEY (`order_service_id`),
  KEY `order_id` (`order_id`),
  KEY `service_id` (`service_id`),
  CONSTRAINT `order_services_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`),
  CONSTRAINT `order_services_ibfk_2` FOREIGN KEY (`service_id`) REFERENCES `common_services` (`service_id`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_services`
--

LOCK TABLES `order_services` WRITE;
/*!40000 ALTER TABLE `order_services` DISABLE KEYS */;
INSERT INTO `order_services` VALUES (1,1,5,0),(2,1,6,0),(4,2,5,0),(5,2,6,0),(6,2,1,0),(7,3,5,0),(8,3,6,0),(9,3,1,0),(10,7,5,0),(11,7,6,0),(13,8,5,0),(14,8,6,0),(15,8,10,0),(16,9,5,0),(17,10,5,0),(18,10,8,0),(19,11,5,0),(20,11,8,0),(21,12,5,0),(22,12,8,0),(23,13,7,0),(24,13,8,0),(25,14,7,0),(26,14,8,0),(27,15,7,0),(28,15,8,0),(29,15,10,0),(30,22,7,0),(31,22,8,0),(32,22,10,0),(33,24,8,0),(34,25,5,0),(35,26,7,0),(36,26,8,0),(37,26,10,0),(38,27,6,0),(39,27,7,0),(40,28,7,0),(41,29,7,0),(42,30,7,0),(43,30,9,0),(44,31,9,0),(45,32,8,0);
/*!40000 ALTER TABLE `order_services` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `order_status`
--

DROP TABLE IF EXISTS `order_status`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `order_status` (
  `order_status_id` int(11) NOT NULL AUTO_INCREMENT,
  `order_id` int(11) NOT NULL,
  `order_status` int(11) NOT NULL,
  PRIMARY KEY (`order_status_id`),
  KEY `order_id` (`order_id`),
  CONSTRAINT `order_status_ibfk_1` FOREIGN KEY (`order_id`) REFERENCES `orders` (`order_id`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `order_status`
--

LOCK TABLES `order_status` WRITE;
/*!40000 ALTER TABLE `order_status` DISABLE KEYS */;
INSERT INTO `order_status` VALUES (1,2,0),(2,3,0),(3,8,0),(4,9,0),(5,10,0),(6,11,0),(7,12,0),(8,13,0),(9,14,0),(10,15,0),(11,22,0),(12,24,0),(13,25,0),(14,26,0),(15,27,1),(16,28,1),(17,29,1),(18,30,1),(19,31,1),(20,32,1);
/*!40000 ALTER TABLE `order_status` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `order_id` int(11) NOT NULL AUTO_INCREMENT,
  `employee_id` int(11) NOT NULL,
  `customer_id` int(11) NOT NULL,
  `vehicle_id` int(11) NOT NULL,
  `order_date` datetime DEFAULT CURRENT_TIMESTAMP,
  `active_order` int(11) NOT NULL,
  `order_hash` varchar(255) NOT NULL,
  PRIMARY KEY (`order_id`),
  KEY `employee_id` (`employee_id`),
  KEY `customer_id` (`customer_id`),
  KEY `vehicle_id` (`vehicle_id`),
  CONSTRAINT `orders_ibfk_1` FOREIGN KEY (`employee_id`) REFERENCES `employee` (`employee_id`),
  CONSTRAINT `orders_ibfk_2` FOREIGN KEY (`customer_id`) REFERENCES `customer_identifier` (`customer_id`),
  CONSTRAINT `orders_ibfk_3` FOREIGN KEY (`vehicle_id`) REFERENCES `customer_vehicle_info` (`vehicle_id`)
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
INSERT INTO `orders` VALUES (1,1,1,1,'2026-04-11 12:20:43',1,'ac5f9863-8788-467f-8414-269dd5a2bc73'),(2,1,1,1,'2026-04-11 12:22:47',1,'3c50cf44-f4bb-4a13-8406-2fafa63695b1'),(3,1,1,1,'2026-04-11 12:37:46',1,'2d49ff2a-067e-4755-a6a3-35eeb00fdebf'),(7,34,18,1,'2026-04-11 13:06:08',1,'f1c93f58-74c3-4ad6-b6a2-2203fa3c4ffe'),(8,34,18,1,'2026-04-11 13:07:38',1,'fe692633-1f08-4e43-a7aa-d775c781c224'),(9,34,18,1,'2026-04-11 14:21:43',1,'79395a9e-bd6d-4748-8031-fa2546b1f7df'),(10,34,18,1,'2026-04-11 14:22:07',1,'94a534dd-a382-4041-8e34-53ace5dd3146'),(11,34,18,1,'2026-04-11 14:22:12',1,'feba5c38-2660-4ecd-99a5-5ff7ccc7578d'),(12,34,18,1,'2026-04-11 14:22:24',1,'40d6099e-cc1d-4644-83f1-a56add67c818'),(13,34,18,1,'2026-04-11 14:24:12',1,'71f9f2c8-cdf2-4ff7-a51f-2c835851987c'),(14,3,17,2,'2026-04-11 14:24:55',1,'48ffa9c4-124d-4885-bea1-90355b094ae3'),(15,3,17,2,'2026-04-11 14:30:24',1,'f749059c-08c9-4a58-840c-615a083a251d'),(16,3,18,5,'2026-04-15 01:14:22',1,'177350a7-bb07-48ae-a121-702ee0c2dd45'),(17,3,22,2,'2026-04-15 01:27:32',1,'e5a0b8c4-1961-49b0-a3dd-9fe4a45fc5e5'),(18,3,22,2,'2026-04-15 01:28:30',1,'a72055ef-55c6-4331-b681-9b4192f1dc47'),(19,3,22,2,'2026-04-15 01:28:34',1,'37ba8a69-7822-4413-8117-6b95753b776b'),(20,3,22,2,'2026-04-15 01:28:36',1,'be1396b9-bbac-43be-9287-6731ad619fb0'),(21,3,22,2,'2026-04-15 01:30:11',1,'b03774ea-3153-4eb1-a728-24cd4c2a8ec8'),(22,3,22,2,'2026-04-15 01:31:20',1,'6ef1f237-e45b-4500-ab44-94e7dd950fda'),(23,3,18,5,'2026-04-15 01:32:07',1,'223f3870-9b9b-497b-a78d-e871ae0b1ea0'),(24,3,18,5,'2026-04-15 01:37:37',1,'5ed69401-d988-4f9c-b711-f4acd81f0a6b'),(25,3,22,10,'2026-04-15 12:20:38',1,'d858e367-af8d-42eb-9d46-739092e1644e'),(26,32,21,10,'2026-04-15 12:32:24',1,'708498ae-0134-4b4f-a0e6-b34e1f16e6db'),(27,3,22,10,'2026-04-15 15:49:32',1,'3da8aa20-a21b-4787-a68b-99987fbc953d'),(28,3,20,11,'2026-04-15 15:52:31',1,'38b79af0-8f19-49cd-a00d-4dbf48a80161'),(29,3,20,11,'2026-04-15 15:58:54',1,'b5b6fbff-3fcc-49e0-b6ab-678dc4f2720a'),(30,3,20,11,'2026-04-15 16:13:24',1,'02199a3f-2262-4c73-bbba-3c1377a3389c'),(31,3,20,11,'2026-04-15 16:14:53',1,'a39e40a8-4dbd-41c5-8edb-af7a00c86b50'),(32,19,18,5,'2026-04-15 21:29:37',1,'4f832de3-4bdb-4ab9-b906-f457ceda0a87');
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Dumping routines for database 'jossiautocare'
--
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-04-16 13:39:04
