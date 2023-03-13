-- MySQL dump 10.13  Distrib 8.0.30, for macos12 (x86_64)
--
-- Host: 127.0.0.1    Database: request_portal
-- ------------------------------------------------------
-- Server version	8.0.32

/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!50503 SET NAMES utf8 */;
/*!40103 SET @OLD_TIME_ZONE=@@TIME_ZONE */;
/*!40103 SET TIME_ZONE='+00:00' */;
/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;

--
-- Table structure for table `account`
--

DROP TABLE IF EXISTS `account`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `account` (
  `account_id` varchar(100) NOT NULL,
  `password` varchar(45) NOT NULL,
  `type` varchar(45) NOT NULL,
  PRIMARY KEY (`account_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `account`
--

LOCK TABLES `account` WRITE;
/*!40000 ALTER TABLE `account` DISABLE KEYS */;
INSERT INTO `account` VALUES ('ITITIU19028','123','student'),('ITITIU19040','123','student');
/*!40000 ALTER TABLE `account` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `data_field`
--

DROP TABLE IF EXISTS `data_field`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `data_field` (
  `data_field_no` int NOT NULL AUTO_INCREMENT,
  `label` varchar(300) NOT NULL,
  `type` varchar(45) NOT NULL,
  `is_disabled` tinyint(1) DEFAULT NULL,
  `form_no` int NOT NULL,
  PRIMARY KEY (`data_field_no`),
  KEY `form_no_idx` (`form_no`),
  CONSTRAINT `form_no` FOREIGN KEY (`form_no`) REFERENCES `form` (`form_no`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `data_field`
--

LOCK TABLES `data_field` WRITE;
/*!40000 ALTER TABLE `data_field` DISABLE KEYS */;
INSERT INTO `data_field` VALUES (1,'Tên sinh viên','text',1,1),(2,'Mã số sinh viên','text',1,1),(3,'Ngày sinh','date',1,1),(4,'Nơi sinh','text',0,1),(5,'Khóa','text',0,1),(6,'Thời gian học tối đa','month',0,1),(7,'Lý do','text',0,1);
/*!40000 ALTER TABLE `data_field` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `form`
--

DROP TABLE IF EXISTS `form`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `form` (
  `form_no` int NOT NULL AUTO_INCREMENT,
  `form_name` varchar(300) NOT NULL,
  PRIMARY KEY (`form_no`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `form`
--

LOCK TABLES `form` WRITE;
/*!40000 ALTER TABLE `form` DISABLE KEYS */;
INSERT INTO `form` VALUES (1,'Xác nhận sinh viên'),(2,'Mẫu đơn xin đăng ký nhập học lại'),(3,'Mẫu đơn xin nhập học lại và gia hạn thời gian học'),(4,'Mẫu đơn xin rút khỏi danh sách đình chỉ học tập'),(5,'Mẫu đơn xin tạm ngưng thời gian học'),(6,'Mẫu đơn xin gia hạn luận văn (Thesis dealine extention  request form)'),(7,'Incomplete (I) grade request form'),(8,'Undergraduate thesis registration form');
/*!40000 ALTER TABLE `form` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `ticket`
--

DROP TABLE IF EXISTS `ticket`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `ticket` (
  `ticket_id` int NOT NULL AUTO_INCREMENT,
  `date_created` varchar(45) NOT NULL,
  `date_approved` varchar(45) DEFAULT NULL,
  `status` varchar(45) DEFAULT 'Waiting',
  `note` varchar(45) DEFAULT NULL,
  `ticket_form_no` int NOT NULL,
  `ticket_data` json DEFAULT NULL,
  `account_id` varchar(100) DEFAULT NULL,
  PRIMARY KEY (`ticket_id`),
  KEY `ticket_form_no_idx` (`ticket_form_no`),
  KEY `account_id` (`account_id`),
  CONSTRAINT `ticket_form_no` FOREIGN KEY (`ticket_form_no`) REFERENCES `form` (`form_no`),
  CONSTRAINT `ticket_ibfk_1` FOREIGN KEY (`account_id`) REFERENCES `account` (`account_id`)
) ENGINE=InnoDB AUTO_INCREMENT=27 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `ticket`
--

LOCK TABLES `ticket` WRITE;
/*!40000 ALTER TABLE `ticket` DISABLE KEYS */;
INSERT INTO `ticket` VALUES (1,'11/02/2023',NULL,'Waiting',NULL,1,NULL,NULL),(2,'11/02/2023',NULL,'Waiting',NULL,1,NULL,NULL),(3,'11/02/2023',NULL,'Waiting',NULL,1,NULL,NULL),(4,'11/02/2023',NULL,'Waiting',NULL,1,NULL,NULL),(5,'11/02/2023',NULL,'Waiting',NULL,1,NULL,NULL),(6,'11/02/2023',NULL,'Waiting',NULL,1,NULL,NULL),(7,'11/02/2023',NULL,'Waiting',NULL,1,NULL,NULL),(8,'11/02/2023',NULL,'Waiting',NULL,1,NULL,NULL),(9,'11/02/2023',NULL,'Waiting',NULL,1,'{\"Khóa\": \"2019-2023\", \"Lý do\": \"thích\", \"Nơi sinh\": \"TP HCM\", \"Thời gian học tối đa\": \"2023-01\"}',NULL),(10,'12/02/2023',NULL,'Waiting',NULL,1,'{\"Khóa\": \"2019=2023\", \"Lý do\": \"hoãn NVQS\", \"Nơi sinh\": \"HCM\", \"Thời gian học tối đa\": \"2023-11\"}',NULL),(11,'11/03/2023',NULL,'Waiting',NULL,1,'{}',NULL),(12,'11/03/2023',NULL,'Waiting',NULL,1,'{}',NULL),(13,'11/03/2023',NULL,'Waiting',NULL,1,'{}',NULL),(14,'11/03/2023',NULL,'Waiting',NULL,1,'{\"Lý do\": \"abc\"}',NULL),(15,'11/03/2023',NULL,'Waiting',NULL,1,'{\"Khóa\": \"123\", \"Lý do\": \"123\", \"Nơi sinh\": \"123\", \"Thời gian học tối đa\": \"2023-03\"}',NULL),(16,'11/03/2023',NULL,'Waiting',NULL,1,'{\"Khóa\": \"123\", \"Lý do\": \"123\", \"Nơi sinh\": \"123\", \"Thời gian học tối đa\": \"2023-06\"}',NULL),(17,'11/03/2023',NULL,'Waiting',NULL,1,'{\"Khóa\": \"123\", \"Lý do\": \"123\", \"Nơi sinh\": \"123\"}','ITITIU19040'),(18,'11/03/2023',NULL,'Waiting',NULL,1,'{}','ITITIU19040'),(19,'11/03/2023',NULL,'Waiting',NULL,1,'{}','ITITIU19040'),(20,'11/03/2023',NULL,'Waiting',NULL,1,'{}',NULL),(21,'11/03/2023',NULL,'Waiting',NULL,1,'{}',NULL),(22,'11/03/2023',NULL,'Waiting',NULL,1,'{}',NULL),(23,'11/03/2023',NULL,'Waiting',NULL,1,'{}',NULL),(24,'11/03/2023',NULL,'Waiting',NULL,1,'{}',NULL),(25,'11/03/2023',NULL,'Waiting',NULL,1,'{}',NULL),(26,'11/03/2023',NULL,'Waiting',NULL,1,'{}',NULL);
/*!40000 ALTER TABLE `ticket` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2023-03-13 20:27:43
