-- MySQL dump 10.13  Distrib 8.0.41, for Win64 (x86_64)
--
-- Host: 127.0.0.1    Database: wellmarket
-- ------------------------------------------------------
-- Server version	8.0.44

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
-- Table structure for table `attribute_options`
--

DROP TABLE IF EXISTS `attribute_options`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attribute_options` (
  `id` int NOT NULL AUTO_INCREMENT,
  `attribute_id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `attribute_id` (`attribute_id`),
  CONSTRAINT `attribute_options_ibfk_1` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=89 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attribute_options`
--

LOCK TABLES `attribute_options` WRITE;
/*!40000 ALTER TABLE `attribute_options` DISABLE KEYS */;
INSERT INTO `attribute_options` VALUES (43,1,'Intel Core i3'),(44,1,'Intel Core i5'),(45,1,'Intel Core i7'),(46,1,'Intel Core i9'),(47,1,'AMD Ryzen 3'),(48,1,'AMD Ryzen 5'),(49,1,'AMD Ryzen 7'),(50,1,'Apple M1'),(51,1,'Apple M2'),(52,2,'4GB'),(53,2,'8GB'),(54,2,'16GB'),(55,2,'32GB'),(56,3,'128GB SSD'),(57,3,'256GB SSD'),(58,3,'512GB SSD'),(59,3,'1TB HDD'),(60,3,'1TB SSD'),(61,4,'13 inch'),(62,4,'14 inch'),(63,4,'15.6 inch'),(64,4,'17 inch'),(65,6,'12MP'),(66,6,'48MP'),(67,6,'64MP'),(68,6,'108MP'),(69,7,'Windows'),(70,7,'macOS'),(71,7,'Linux'),(72,7,'Android'),(73,7,'iOS'),(74,8,'Đen'),(75,8,'Trắng'),(76,8,'Xanh'),(77,8,'Đỏ'),(78,8,'Bạc'),(79,9,'800W'),(80,9,'1000W'),(81,9,'1200W'),(82,9,'1500W'),(83,10,'2L'),(84,10,'3L'),(85,10,'5L'),(86,10,'10L'),(87,5,'4000mAh'),(88,5,'5000mAh');
/*!40000 ALTER TABLE `attribute_options` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `attributes`
--

DROP TABLE IF EXISTS `attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `attributes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) NOT NULL,
  `label` varchar(150) NOT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=19 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attributes`
--

LOCK TABLES `attributes` WRITE;
/*!40000 ALTER TABLE `attributes` DISABLE KEYS */;
INSERT INTO `attributes` VALUES (1,'cpu','Bộ vi xử lý'),(2,'ram','RAM'),(3,'storage','Ổ cứng'),(4,'screen_size','Kích cỡ màn hình'),(5,'battery','Dung lượng pin'),(6,'camera','Camera'),(7,'os','Hệ điều hành'),(8,'color','Màu sắc'),(9,'power','Công suất'),(10,'capacity','Dung tích');
/*!40000 ALTER TABLE `attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boost_package_categories`
--

DROP TABLE IF EXISTS `boost_package_categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boost_package_categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boost_package_categories`
--

LOCK TABLES `boost_package_categories` WRITE;
/*!40000 ALTER TABLE `boost_package_categories` DISABLE KEYS */;
INSERT INTO `boost_package_categories` VALUES (1,'Đẩy tin hẹn giờ','Các gói giúp bài đăng được hiển thị nổi bật hơn: đẩy theo giờ đã hẹn trước.'),(2,'Đẩy tin','Các gói giúp bài đăng được hiển thị nổi bật hơn: đẩy ngay, hoặc ưu tiên top kết quả tìm kiếm.'),(3,'Nâng cấp giao diện','Các gói làm bài đăng nổi bật về hình thức: hiển thị lớn hơn, kèm nhiều ảnh/video.');
/*!40000 ALTER TABLE `boost_package_categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `boost_packages`
--

DROP TABLE IF EXISTS `boost_packages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `boost_packages` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `category_id` int NOT NULL,
  `price` decimal(13,2) NOT NULL,
  `priority` int DEFAULT '1',
  `description` text COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `duration` int NOT NULL DEFAULT '1' COMMENT 'Thời lượng tính bằng giờ',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `category_id` (`category_id`) USING BTREE,
  CONSTRAINT `boost_packages_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `boost_package_categories` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=6 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `boost_packages`
--

LOCK TABLES `boost_packages` WRITE;
/*!40000 ALTER TABLE `boost_packages` DISABLE KEYS */;
INSERT INTO `boost_packages` VALUES (2,'Đẩy tin thường',2,15000.00,1,'Đẩy tin ngay sau khi thanh toán. Bài đăng sẽ được ưu tiên hiển thị trong vòng 1 giờ để tiếp cận nhiều người hơn.','2025-12-31 10:11:06','2025-12-31 10:11:06',1),(3,'Đẩy tin hẹn giờ',1,15000.00,1,'Người dùng chọn khung giờ và số lần đẩy. Tối thiểu 8 lần, nếu chọn nhiều hơn, giá sẽ tăng theo số lần. Giúp bài đăng xuất hiện đều đặn theo lịch mong muốn.','2025-12-31 10:11:06','2026-01-02 14:53:41',1),(4,'Đẩy tin ưu tiên',2,50000.00,3,'Trong 7 ngày, bài đăng luôn nằm trong top 5 kết quả tìm kiếm liên quan, kể cả khi người dùng chuyển sang trang kế tiếp. Phù hợp cho tin quan trọng, cần nhiều lượt xem.','2025-12-31 10:11:06','2025-12-31 10:11:06',1),(5,'Nâng cấp giao diện',3,20000.00,0,'Bài đăng hiển thị nổi bật hơn: kích thước gấp đôi, hiển thị thêm nhiều ảnh trong nội dung. Hiệu lực 7 ngày.','2025-12-31 10:11:06','2025-12-31 10:11:06',1);
/*!40000 ALTER TABLE `boost_packages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `brands`
--

DROP TABLE IF EXISTS `brands`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `brands` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `category_id` int NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `brands_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=16 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `brands`
--

LOCK TABLES `brands` WRITE;
/*!40000 ALTER TABLE `brands` DISABLE KEYS */;
INSERT INTO `brands` VALUES (1,'Apple',2,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(2,'Samsung',2,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(3,'Xiaomi',2,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(4,'Dell',3,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(5,'Acer',3,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(6,'Asus',3,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(7,'Sony',5,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(8,'LG',5,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(9,'JBL',5,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(10,'Philips',16,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(11,'Sharp',16,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(12,'Panasonic',16,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(13,'Nike',26,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(14,'Adidas',26,'2025-12-31 17:40:26','2025-12-31 17:40:26'),(15,'Gucci',26,'2025-12-31 17:40:26','2025-12-31 17:40:26');
/*!40000 ALTER TABLE `brands` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `categories`
--

DROP TABLE IF EXISTS `categories`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `categories` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `parent_id` int DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_categories_parent` (`parent_id`) USING BTREE,
  CONSTRAINT `fk_categories_parent` FOREIGN KEY (`parent_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=33 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `categories`
--

LOCK TABLES `categories` WRITE;
/*!40000 ALTER TABLE `categories` DISABLE KEYS */;
INSERT INTO `categories` VALUES (1,'Đồ điện tử',NULL,'2025-12-31 17:37:23','2025-12-31 17:37:23'),(2,'Điện thoại',1,'2025-12-31 17:37:23','2025-12-31 17:37:23'),(3,'Laptop',1,'2025-12-31 17:37:23','2025-12-31 17:37:23'),(4,'Máy ảnh',1,'2025-12-31 17:37:23','2025-12-31 17:37:23'),(5,'Tivi, Âm thanh',1,'2025-12-31 17:37:23','2025-12-31 17:37:23'),(12,'Đồ gia dụng',NULL,'2025-12-31 17:37:23','2025-12-31 17:37:23'),(16,'Bếp, lò, đồ điện nhà bếp',12,'2025-12-31 17:37:23','2025-12-31 17:37:23'),(20,'Cây cảnh, đồ trang trí',12,'2025-12-31 17:37:23','2025-12-31 17:37:23'),(21,'Thiết bị vệ sinh, nhà tắm',12,'2025-12-31 17:37:23','2025-12-31 17:37:23'),(26,'Thời trang',NULL,'2025-12-31 17:37:23','2025-12-31 17:37:23'),(30,'Quần áo',26,'2025-12-31 17:37:23','2025-12-31 17:37:23'),(32,'Phụ kiện thời trang khác',26,'2025-12-31 17:37:23','2025-12-31 17:37:23');
/*!40000 ALTER TABLE `categories` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_attributes`
--

DROP TABLE IF EXISTS `category_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_attributes` (
  `category_id` int NOT NULL,
  `attribute_id` int NOT NULL,
  PRIMARY KEY (`category_id`,`attribute_id`),
  KEY `attribute_id` (`attribute_id`),
  CONSTRAINT `category_attributes_ibfk_1` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`),
  CONSTRAINT `category_attributes_ibfk_2` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_attributes`
--

LOCK TABLES `category_attributes` WRITE;
/*!40000 ALTER TABLE `category_attributes` DISABLE KEYS */;
INSERT INTO `category_attributes` VALUES (3,1),(2,2),(3,2),(3,3),(3,4),(2,5),(2,6),(3,7),(2,8),(3,8),(16,9),(16,10);
/*!40000 ALTER TABLE `category_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `category_images`
--

DROP TABLE IF EXISTS `category_images`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `category_images` (
  `id` bigint unsigned NOT NULL AUTO_INCREMENT,
  `category_id` int NOT NULL,
  `file_id` bigint NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `unique_category_image` (`category_id`),
  KEY `fk_category_images_file` (`file_id`),
  CONSTRAINT `fk_category_images_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_category_images_file` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `category_images`
--

LOCK TABLES `category_images` WRITE;
/*!40000 ALTER TABLE `category_images` DISABLE KEYS */;
/*!40000 ALTER TABLE `category_images` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `conversations`
--

DROP TABLE IF EXISTS `conversations`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `conversations` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `user_one_id` bigint NOT NULL,
  `user_two_id` bigint NOT NULL,
  `last_message_id` bigint DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uniq_pair` (`user_one_id`,`user_two_id`),
  KEY `fk_conv_user_two` (`user_two_id`),
  KEY `fk_conv_last_msg` (`last_message_id`),
  CONSTRAINT `fk_conv_last_msg` FOREIGN KEY (`last_message_id`) REFERENCES `messages` (`id`) ON DELETE SET NULL,
  CONSTRAINT `fk_conv_user_one` FOREIGN KEY (`user_one_id`) REFERENCES `users` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_conv_user_two` FOREIGN KEY (`user_two_id`) REFERENCES `users` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `conversations`
--

LOCK TABLES `conversations` WRITE;
/*!40000 ALTER TABLE `conversations` DISABLE KEYS */;
INSERT INTO `conversations` VALUES (3,3,4,72,'2026-01-04 11:39:01','2026-01-04 18:21:23'),(4,3,3,57,'2026-01-04 12:07:33','2026-01-04 17:35:37');
/*!40000 ALTER TABLE `conversations` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `event_participants`
--

DROP TABLE IF EXISTS `event_participants`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `event_participants` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `event_id` bigint NOT NULL,
  `user_id` bigint NOT NULL,
  `participated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `reward_claimed` tinyint(1) DEFAULT '0',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `event_id` (`event_id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  CONSTRAINT `event_participants_ibfk_1` FOREIGN KEY (`event_id`) REFERENCES `events` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `event_participants_ibfk_2` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `event_participants`
--

LOCK TABLES `event_participants` WRITE;
/*!40000 ALTER TABLE `event_participants` DISABLE KEYS */;
/*!40000 ALTER TABLE `event_participants` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `events`
--

DROP TABLE IF EXISTS `events`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `events` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `event_type` enum('daily','monthly') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `reward_amount` decimal(13,2) NOT NULL DEFAULT '0.00',
  `minigame_type_id` bigint DEFAULT NULL,
  `start_date` datetime NOT NULL,
  `end_date` datetime NOT NULL,
  `status` enum('active','inactive') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_events_minigame_type` (`minigame_type_id`) USING BTREE,
  CONSTRAINT `fk_events_minigame_type` FOREIGN KEY (`minigame_type_id`) REFERENCES `minigame_types` (`id`) ON DELETE SET NULL ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `events`
--

LOCK TABLES `events` WRITE;
/*!40000 ALTER TABLE `events` DISABLE KEYS */;
INSERT INTO `events` VALUES (1,'Hội chợ cuối năm','Sự kiện giảm giá lớn','daily',1000.00,NULL,'2025-12-01 00:00:00','2025-12-10 00:00:00','active','2025-11-27 00:45:21',NULL);
/*!40000 ALTER TABLE `events` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `files`
--

DROP TABLE IF EXISTS `files`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `files` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `storage_provider` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 's3',
  `object_key` varchar(1024) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `url` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `thumbnail_url` varchar(2048) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `file_name` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `content_type` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `file_size` bigint DEFAULT NULL,
  `width` int DEFAULT NULL,
  `height` int DEFAULT NULL,
  `file_type` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `uploaded_by` bigint DEFAULT NULL,
  `is_public` tinyint(1) NOT NULL DEFAULT '1',
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_files_type` (`file_type`) USING BTREE,
  KEY `idx_files_uploaded_by` (`uploaded_by`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=115 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (47,'cloudinary','k9fmryrlnkney0kuiklm','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767294063/k9fmryrlnkney0kuiklm.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"6a2b4d9b5abb1d57c761dfdf096c1ec8\",\"public_id\":\"k9fmryrlnkney0kuiklm\",\"version\":1767294063,\"version_id\":\"76e4d7a730ffc1d9d41d7f41f42ec322\",\"signature\":\"f459232ec578ced87a7d4219c24b15e71744a836\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-01T19:01:03Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294063\\/k9fmryrlnkney0kuiklm.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294063\\/k9fmryrlnkney0kuiklm.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-01 19:01:04','2026-01-01 19:01:04'),(48,'cloudinary','rgog0cs31xe49rtytm9u','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767294945/rgog0cs31xe49rtytm9u.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"8c80a2e05a9c7721a0009ddd65fe3620\",\"public_id\":\"rgog0cs31xe49rtytm9u\",\"version\":1767294945,\"version_id\":\"b35a67372d02cd778633b36e12080c8c\",\"signature\":\"024129bc3c76c5236f8ec7286f9d69113759329c\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-01T19:15:45Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294945\\/rgog0cs31xe49rtytm9u.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294945\\/rgog0cs31xe49rtytm9u.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-01 19:15:46','2026-01-01 19:15:46'),(49,'cloudinary','gbjtnbbmfzb7kabv4tgl','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767294950/gbjtnbbmfzb7kabv4tgl.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"6fd930bdc46613687097d50bb191eb03\",\"public_id\":\"gbjtnbbmfzb7kabv4tgl\",\"version\":1767294950,\"version_id\":\"6066b186089a2e8da532f9a12215ed40\",\"signature\":\"1353db36b1efdee33c7a4ea7c68899ce4da230c4\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-01T19:15:50Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294950\\/gbjtnbbmfzb7kabv4tgl.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294950\\/gbjtnbbmfzb7kabv4tgl.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-01 19:15:52','2026-01-01 19:15:52'),(50,'cloudinary','kl7xkvhog4tm4wi3mywu','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767294956/kl7xkvhog4tm4wi3mywu.jpg',NULL,'z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa','image/jpeg',1213552,1920,2560,'image',3,1,'{\"asset_id\":\"f1cd4c42e7e14b3558fe8110c3c92ee9\",\"public_id\":\"kl7xkvhog4tm4wi3mywu\",\"version\":1767294956,\"version_id\":\"51b5ac83092c1ff47259ff72243bbd7d\",\"signature\":\"f89ade81f00fa2bfbcc87386f29f0017c0d32b99\",\"width\":1920,\"height\":2560,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-01T19:15:56Z\",\"tags\":[],\"bytes\":1213552,\"type\":\"upload\",\"etag\":\"b05aa77038a09e2bd1500de1baecab1e\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294956\\/kl7xkvhog4tm4wi3mywu.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294956\\/kl7xkvhog4tm4wi3mywu.jpg\",\"asset_folder\":null,\"display_name\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\",\"original_filename\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\"}','2026-01-01 19:15:56','2026-01-01 19:15:56'),(51,'cloudinary','mc2izuozfh47tr4mbafn','https://res.cloudinary.com/dj7ljwprv/video/upload/v1767294961/mc2izuozfh47tr4mbafn.mp4',NULL,'2025-12-31 19-14-17','video/mp4',1448697,1920,1080,'video',3,1,'{\"asset_id\":\"bba1c25893fe9b5a426453294c6a56aa\",\"public_id\":\"mc2izuozfh47tr4mbafn\",\"version\":1767294961,\"version_id\":\"ca79351d0330e1b7aec9da8c400f0782\",\"signature\":\"cb4c712a401733a7264345b6385096a079ee9035\",\"width\":1920,\"height\":1080,\"format\":\"mp4\",\"resource_type\":\"video\",\"created_at\":\"2026-01-01T19:16:01Z\",\"tags\":[],\"pages\":0,\"bytes\":1448697,\"type\":\"upload\",\"etag\":\"74bacd519acd497538ab2b2e8165e8a6\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767294961\\/mc2izuozfh47tr4mbafn.mp4\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767294961\\/mc2izuozfh47tr4mbafn.mp4\",\"playback_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/sp_auto\\/v1767294961\\/mc2izuozfh47tr4mbafn.m3u8\",\"asset_folder\":null,\"display_name\":\"2025-12-31 19-14-17\",\"audio\":{\"codec\":\"aac\",\"bit_rate\":\"81901\",\"frequency\":48000,\"channels\":2,\"channel_layout\":\"stereo\"},\"video\":{\"pix_format\":\"yuv420p\",\"codec\":\"h264\",\"level\":42,\"profile\":\"High\",\"bit_rate\":\"6003073\",\"dar\":\"16:9\",\"time_base\":\"1\\/15360\"},\"is_audio\":false,\"frame_rate\":60,\"bit_rate\":6099776,\"duration\":1.9,\"rotation\":0,\"original_filename\":\"2025-12-31 19-14-17\",\"nb_frames\":114}','2026-01-01 19:16:03','2026-01-01 19:16:03'),(76,'cloudinary','npkolyjgzmxdyywocjgv','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767330478/npkolyjgzmxdyywocjgv.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"da8557a33e4f4881d819009363909f7b\",\"public_id\":\"npkolyjgzmxdyywocjgv\",\"version\":1767330478,\"version_id\":\"f0a350f6140af745140da46c0bea356e\",\"signature\":\"1e9519347af9e227ebdbddc5580be77ddd480fde\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T05:07:58Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330478\\/npkolyjgzmxdyywocjgv.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330478\\/npkolyjgzmxdyywocjgv.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-02 05:07:59','2026-01-02 05:07:59'),(77,'cloudinary','wxp1vftjnuhfribxyqvg','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767330481/wxp1vftjnuhfribxyqvg.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"20ac090540b552dec10140dfdea5ae7a\",\"public_id\":\"wxp1vftjnuhfribxyqvg\",\"version\":1767330481,\"version_id\":\"c7d0ad999db03c08867e6a7377ee09f9\",\"signature\":\"cfa7e08fe5bd5e553c35101e1730b9bf5f25596b\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T05:08:01Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330481\\/wxp1vftjnuhfribxyqvg.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330481\\/wxp1vftjnuhfribxyqvg.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-02 05:08:02','2026-01-02 05:08:02'),(78,'cloudinary','hczn3qj6wsu4ziln4t1y','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767330485/hczn3qj6wsu4ziln4t1y.jpg',NULL,'z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa','image/jpeg',1213552,1920,2560,'image',3,1,'{\"asset_id\":\"23080e4ce690e6460ad6b53e78a5f01f\",\"public_id\":\"hczn3qj6wsu4ziln4t1y\",\"version\":1767330485,\"version_id\":\"b2fdd7a2016391b1ff304bdad4b936be\",\"signature\":\"863ff5a5e71b09474730acacf3c16e50ff21700c\",\"width\":1920,\"height\":2560,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T05:08:05Z\",\"tags\":[],\"bytes\":1213552,\"type\":\"upload\",\"etag\":\"b05aa77038a09e2bd1500de1baecab1e\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330485\\/hczn3qj6wsu4ziln4t1y.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330485\\/hczn3qj6wsu4ziln4t1y.jpg\",\"asset_folder\":null,\"display_name\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\",\"original_filename\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\"}','2026-01-02 05:08:06','2026-01-02 05:08:06'),(79,'cloudinary','uaxnrlillojttud3heur','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767330551/uaxnrlillojttud3heur.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"918ab5729c140517b600d5f374f9fd8b\",\"public_id\":\"uaxnrlillojttud3heur\",\"version\":1767330551,\"version_id\":\"dfd367a8633013ee8a4e999dbb206ac7\",\"signature\":\"84652d2689acbf6e712d45e4098e9f976eec3fa0\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T05:09:11Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330551\\/uaxnrlillojttud3heur.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330551\\/uaxnrlillojttud3heur.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-02 05:09:12','2026-01-02 05:09:12'),(80,'cloudinary','zsnxvu4xrb46i95zzbgc','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767330553/zsnxvu4xrb46i95zzbgc.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"6ec30f5d7d7a5bc8f0063b8ec500b256\",\"public_id\":\"zsnxvu4xrb46i95zzbgc\",\"version\":1767330553,\"version_id\":\"6873e4d4788f479553b7bc2bc1e2a1bb\",\"signature\":\"8c84159f963cbc9003584a768b2422668ff37715\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T05:09:13Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330553\\/zsnxvu4xrb46i95zzbgc.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330553\\/zsnxvu4xrb46i95zzbgc.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-02 05:09:14','2026-01-02 05:09:14'),(81,'cloudinary','llgoaugwylshl3kzhqcz','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767330558/llgoaugwylshl3kzhqcz.jpg',NULL,'z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa','image/jpeg',1213552,1920,2560,'image',3,1,'{\"asset_id\":\"ced8f2f7aa886d4a0f67732f16d7c47d\",\"public_id\":\"llgoaugwylshl3kzhqcz\",\"version\":1767330558,\"version_id\":\"d277e460d999cec404e89e1bda780b1f\",\"signature\":\"d52cc44ccef4e9636eed9c8a5621de89963cc199\",\"width\":1920,\"height\":2560,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T05:09:18Z\",\"tags\":[],\"bytes\":1213552,\"type\":\"upload\",\"etag\":\"b05aa77038a09e2bd1500de1baecab1e\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330558\\/llgoaugwylshl3kzhqcz.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330558\\/llgoaugwylshl3kzhqcz.jpg\",\"asset_folder\":null,\"display_name\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\",\"original_filename\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\"}','2026-01-02 05:09:18','2026-01-02 05:09:18'),(82,'cloudinary','xuxfx7avdk2h6oqame3e','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767344833/xuxfx7avdk2h6oqame3e.jpg',NULL,'z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa','image/jpeg',1213552,1920,2560,'image',3,1,'{\"asset_id\":\"91d95a13836c920ce0262863edd2e65e\",\"public_id\":\"xuxfx7avdk2h6oqame3e\",\"version\":1767344833,\"version_id\":\"6e16716e89feb34a4b24fb6e055df4a4\",\"signature\":\"d1cf7d721082c4900ed1a79f18456656ba9dc8a3\",\"width\":1920,\"height\":2560,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T09:07:13Z\",\"tags\":[],\"bytes\":1213552,\"type\":\"upload\",\"etag\":\"b05aa77038a09e2bd1500de1baecab1e\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767344833\\/xuxfx7avdk2h6oqame3e.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767344833\\/xuxfx7avdk2h6oqame3e.jpg\",\"asset_folder\":null,\"display_name\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\",\"original_filename\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\"}','2026-01-02 09:07:14','2026-01-02 09:07:14'),(83,'cloudinary','zrjw8zxyukhe7zgmnqrs','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767345242/zrjw8zxyukhe7zgmnqrs.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"05859942b9c2aaa063e05d295ad94aff\",\"public_id\":\"zrjw8zxyukhe7zgmnqrs\",\"version\":1767345242,\"version_id\":\"31c6024be5a30350bf2512280c781ddf\",\"signature\":\"9ad87454ae1aac59eb9aeca3be1c86480e787c98\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T09:14:02Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767345242\\/zrjw8zxyukhe7zgmnqrs.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767345242\\/zrjw8zxyukhe7zgmnqrs.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-02 09:14:03','2026-01-02 09:14:03'),(84,'cloudinary','hltzkgfutko8r4onaqff','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767345583/hltzkgfutko8r4onaqff.jpg',NULL,'z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa','image/jpeg',1213552,1920,2560,'image',3,1,'{\"asset_id\":\"6f2313cfef8239610e1fd7c5f79c82e8\",\"public_id\":\"hltzkgfutko8r4onaqff\",\"version\":1767345583,\"version_id\":\"f03a8dd10c156e9fc63489819a7549e4\",\"signature\":\"b76739dbb7a3b106f6b8d1f6629defc98c622a96\",\"width\":1920,\"height\":2560,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T09:19:43Z\",\"tags\":[],\"bytes\":1213552,\"type\":\"upload\",\"etag\":\"b05aa77038a09e2bd1500de1baecab1e\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767345583\\/hltzkgfutko8r4onaqff.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767345583\\/hltzkgfutko8r4onaqff.jpg\",\"asset_folder\":null,\"display_name\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\",\"original_filename\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\"}','2026-01-02 09:19:43','2026-01-02 09:19:43'),(85,'cloudinary','ty8zews5xk9qfvjmibfs','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767345931/ty8zews5xk9qfvjmibfs.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"63cb3fa7074f6724bc1ad8b6d227d8cb\",\"public_id\":\"ty8zews5xk9qfvjmibfs\",\"version\":1767345931,\"version_id\":\"d131404dc2f1ad8936536ccccc00d0f0\",\"signature\":\"d18aee67f69f959615c17636fd4716e683c03fc2\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T09:25:31Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767345931\\/ty8zews5xk9qfvjmibfs.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767345931\\/ty8zews5xk9qfvjmibfs.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-02 09:25:32','2026-01-02 09:25:32'),(86,'cloudinary','qwlvdrgujttmdlclfk9x','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767346694/qwlvdrgujttmdlclfk9x.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"12464311c931c30fba2f54dba2517b52\",\"public_id\":\"qwlvdrgujttmdlclfk9x\",\"version\":1767346694,\"version_id\":\"1d7f355a80795c31a2b4d671f146c752\",\"signature\":\"d883394a0724310f226cdbea736f0f10b05ed011\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T09:38:14Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767346694\\/qwlvdrgujttmdlclfk9x.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767346694\\/qwlvdrgujttmdlclfk9x.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-02 09:38:14','2026-01-02 09:38:14'),(87,'cloudinary','pfopx2kmoqfvdwldlfpt','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767349447/pfopx2kmoqfvdwldlfpt.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"884daa674b444f9cf97c9836895b9b9a\",\"public_id\":\"pfopx2kmoqfvdwldlfpt\",\"version\":1767349447,\"version_id\":\"6f814dd2ac82a309d0847dbf732b78c3\",\"signature\":\"64b469c7af72fafec8debcdd3795b55fae857abe\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T10:24:07Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767349447\\/pfopx2kmoqfvdwldlfpt.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767349447\\/pfopx2kmoqfvdwldlfpt.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-02 10:24:08','2026-01-02 10:24:08'),(88,'cloudinary','ugtsen3ejjfnuexlr9db','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767349712/ugtsen3ejjfnuexlr9db.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"6d2f13313dc420518c9946baad871fb0\",\"public_id\":\"ugtsen3ejjfnuexlr9db\",\"version\":1767349712,\"version_id\":\"b012e7fb95ef23c862263cd6243aec71\",\"signature\":\"720e9e59cf47bcf361e0cf1dd6ce7f52cd6f58ed\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T10:28:32Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767349712\\/ugtsen3ejjfnuexlr9db.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767349712\\/ugtsen3ejjfnuexlr9db.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-02 10:28:33','2026-01-02 10:28:33'),(89,'cloudinary','uigyjgetbdxfngvfwrhj','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767349975/uigyjgetbdxfngvfwrhj.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"4baa5c85e04ff9d1d237ad30a07ff0f7\",\"public_id\":\"uigyjgetbdxfngvfwrhj\",\"version\":1767349975,\"version_id\":\"1fb4b758359acc7b5f162e8021e3dc68\",\"signature\":\"327c151d4917f75662ff0c49bfb6e3892dd4fda7\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T10:32:55Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767349975\\/uigyjgetbdxfngvfwrhj.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767349975\\/uigyjgetbdxfngvfwrhj.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-02 10:32:56','2026-01-02 10:32:56'),(90,'cloudinary','dcb9wmbkkpdfxxr84xep','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767372667/dcb9wmbkkpdfxxr84xep.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"8c2439deb4df2f6226b347ffaf557dd9\",\"public_id\":\"dcb9wmbkkpdfxxr84xep\",\"version\":1767372667,\"version_id\":\"a4df93f865f6abf29ee35c048059d5f2\",\"signature\":\"d0ea392124d045152ba0ce461258ff329454ba20\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T16:51:07Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767372667\\/dcb9wmbkkpdfxxr84xep.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767372667\\/dcb9wmbkkpdfxxr84xep.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-02 16:51:08','2026-01-02 16:51:08'),(91,'cloudinary','hsmp33jjt0fhy0xmhkp6','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767373717/hsmp33jjt0fhy0xmhkp6.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"d582135b76388adf16b5269145bb294d\",\"public_id\":\"hsmp33jjt0fhy0xmhkp6\",\"version\":1767373717,\"version_id\":\"8a79f9fe2c8795d7e0136a659f0d16bc\",\"signature\":\"5559676290cc2c46c68c1e1f59058487e1d1a4b9\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T17:08:37Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767373717\\/hsmp33jjt0fhy0xmhkp6.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767373717\\/hsmp33jjt0fhy0xmhkp6.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-02 17:08:38','2026-01-02 17:08:38'),(92,'cloudinary','cimb3dll9hevv127syre','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767377082/cimb3dll9hevv127syre.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"e08232e7d79ade068272a3022e9bbb95\",\"public_id\":\"cimb3dll9hevv127syre\",\"version\":1767377082,\"version_id\":\"95d1260f3b3e5a9d2990a4bbe52061a1\",\"signature\":\"4aa91a345edda259b850cb6e4fb1c830ac12d123\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T18:04:42Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767377082\\/cimb3dll9hevv127syre.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767377082\\/cimb3dll9hevv127syre.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-02 18:04:43','2026-01-02 18:04:43'),(93,'cloudinary','y3kqdbsz0wetovwqqh6r','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767377282/y3kqdbsz0wetovwqqh6r.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"afd80ff494d71ee5c5271dfd92b28201\",\"public_id\":\"y3kqdbsz0wetovwqqh6r\",\"version\":1767377282,\"version_id\":\"dfdbf839b58e9dd8f475e71f2fa1a9d8\",\"signature\":\"54b0762dc2b03e7b6376fab776fb1ca86fba1d54\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T18:08:02Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767377282\\/y3kqdbsz0wetovwqqh6r.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767377282\\/y3kqdbsz0wetovwqqh6r.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-02 18:08:03','2026-01-02 18:08:03'),(94,'cloudinary','q9awt65uml3sm25yr45i','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767378965/q9awt65uml3sm25yr45i.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"ab5921bfa053158394d232b047a5a9d9\",\"public_id\":\"q9awt65uml3sm25yr45i\",\"version\":1767378965,\"version_id\":\"ba9955da76ac7a962c815a00416833e2\",\"signature\":\"4706770f8b2fbecc80d9116bb07536a2d1a270ec\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T18:36:05Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767378965\\/q9awt65uml3sm25yr45i.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767378965\\/q9awt65uml3sm25yr45i.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-02 18:36:06','2026-01-02 18:36:06'),(95,'cloudinary','wsdhiibqsjeounabbovd','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767473946/wsdhiibqsjeounabbovd.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"5e6335b7a58352a94f2a373b317ccc57\",\"public_id\":\"wsdhiibqsjeounabbovd\",\"version\":1767473946,\"version_id\":\"d312097d6eb0973b3bce7f4bf11ff046\",\"signature\":\"ceb29dd93fa61004aa4be448f490f289e37ebb3c\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-03T20:59:06Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767473946\\/wsdhiibqsjeounabbovd.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767473946\\/wsdhiibqsjeounabbovd.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-03 20:59:08','2026-01-03 20:59:08'),(96,'cloudinary','ba8fy6lpwuwaykkkiv2u','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767484701/ba8fy6lpwuwaykkkiv2u.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"faf807bcf305e73c5f7c977feb145d9a\",\"public_id\":\"ba8fy6lpwuwaykkkiv2u\",\"version\":1767484701,\"version_id\":\"82ca576d8da9e22e1c5de5184fa1387c\",\"signature\":\"89dc02a2e67016bfa13549f03290ff1249a5aa91\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-03T23:58:21Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767484701\\/ba8fy6lpwuwaykkkiv2u.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767484701\\/ba8fy6lpwuwaykkkiv2u.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-03 23:58:21','2026-01-03 23:58:21'),(97,'cloudinary','fpsjtnsq5kf3vpk8n0sw','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767484702/fpsjtnsq5kf3vpk8n0sw.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"2a92bf3fa41e9edc9d2ac61e9a0dc97c\",\"public_id\":\"fpsjtnsq5kf3vpk8n0sw\",\"version\":1767484702,\"version_id\":\"5a116479b81136a771d33a1e21dc81d0\",\"signature\":\"9993bbfad7bda3f80341136a20fd52a94a49c345\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-03T23:58:22Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767484702\\/fpsjtnsq5kf3vpk8n0sw.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767484702\\/fpsjtnsq5kf3vpk8n0sw.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-03 23:58:23','2026-01-03 23:58:23'),(98,'cloudinary','myyh8q4iwa29c1mm8qtb','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767484703/myyh8q4iwa29c1mm8qtb.jpg',NULL,'z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa','image/jpeg',1213552,1920,2560,'image',3,1,'{\"asset_id\":\"0e346c03ee96bb5ebc0646a593b57a9b\",\"public_id\":\"myyh8q4iwa29c1mm8qtb\",\"version\":1767484703,\"version_id\":\"a392f593e36e23a7bed1ebccb559b6f3\",\"signature\":\"d759bd44285b117870758f1fc997dbfcd41a2b21\",\"width\":1920,\"height\":2560,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-03T23:58:23Z\",\"tags\":[],\"bytes\":1213552,\"type\":\"upload\",\"etag\":\"b05aa77038a09e2bd1500de1baecab1e\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767484703\\/myyh8q4iwa29c1mm8qtb.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767484703\\/myyh8q4iwa29c1mm8qtb.jpg\",\"asset_folder\":null,\"display_name\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\",\"original_filename\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\"}','2026-01-03 23:58:24','2026-01-03 23:58:24'),(99,'cloudinary','lmzwtaeezgeolodv1pkh','https://res.cloudinary.com/dj7ljwprv/video/upload/v1767484704/lmzwtaeezgeolodv1pkh.mp4',NULL,'2025-12-31 19-14-17','video/mp4',1448697,1920,1080,'video',3,1,'{\"asset_id\":\"3618034087c17dffc3a7bbce292858be\",\"public_id\":\"lmzwtaeezgeolodv1pkh\",\"version\":1767484704,\"version_id\":\"470589be7e93772afbd159efa711af93\",\"signature\":\"7c22a44e8a6df14cf74d081f267e43e2ad8a54ee\",\"width\":1920,\"height\":1080,\"format\":\"mp4\",\"resource_type\":\"video\",\"created_at\":\"2026-01-03T23:58:24Z\",\"tags\":[],\"pages\":0,\"bytes\":1448697,\"type\":\"upload\",\"etag\":\"74bacd519acd497538ab2b2e8165e8a6\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767484704\\/lmzwtaeezgeolodv1pkh.mp4\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767484704\\/lmzwtaeezgeolodv1pkh.mp4\",\"playback_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/sp_auto\\/v1767484704\\/lmzwtaeezgeolodv1pkh.m3u8\",\"asset_folder\":null,\"display_name\":\"2025-12-31 19-14-17\",\"audio\":{\"codec\":\"aac\",\"bit_rate\":\"81901\",\"frequency\":48000,\"channels\":2,\"channel_layout\":\"stereo\"},\"video\":{\"pix_format\":\"yuv420p\",\"codec\":\"h264\",\"level\":42,\"profile\":\"High\",\"bit_rate\":\"6003073\",\"dar\":\"16:9\",\"time_base\":\"1\\/15360\"},\"is_audio\":false,\"frame_rate\":60,\"bit_rate\":6099776,\"duration\":1.9,\"rotation\":0,\"original_filename\":\"2025-12-31 19-14-17\",\"nb_frames\":114}','2026-01-03 23:58:26','2026-01-03 23:58:26'),(100,'cloudinary','utjaq51jljcm4us1t3us','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767484912/utjaq51jljcm4us1t3us.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"ff8b9a8090589bc19cff9eaaaadc0317\",\"public_id\":\"utjaq51jljcm4us1t3us\",\"version\":1767484912,\"version_id\":\"6a91cd203cc913a2ecc723a69fad4078\",\"signature\":\"ad5df01cee34d04d2bd2d7bfb693e5b3fd2b1e52\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-04T00:01:52Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767484912\\/utjaq51jljcm4us1t3us.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767484912\\/utjaq51jljcm4us1t3us.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-04 00:01:52','2026-01-04 00:01:52'),(101,'cloudinary','h4qsgzmkbwviuuulmiab','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767484913/h4qsgzmkbwviuuulmiab.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"f4a01d8570af48402bfbd59b3e7f58d6\",\"public_id\":\"h4qsgzmkbwviuuulmiab\",\"version\":1767484913,\"version_id\":\"db39e16217a280a69fa8a119d512279b\",\"signature\":\"c9818cc41a079325b135a710a9b1654d3eda22e7\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-04T00:01:53Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767484913\\/h4qsgzmkbwviuuulmiab.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767484913\\/h4qsgzmkbwviuuulmiab.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-04 00:01:53','2026-01-04 00:01:53'),(102,'cloudinary','jztkrtradnoxtpcjhd6p','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767484914/jztkrtradnoxtpcjhd6p.jpg',NULL,'z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa','image/jpeg',1213552,1920,2560,'image',3,1,'{\"asset_id\":\"bba826f9196f75ec4a0430622e16abad\",\"public_id\":\"jztkrtradnoxtpcjhd6p\",\"version\":1767484914,\"version_id\":\"263f517c29104459a343d06c4e808944\",\"signature\":\"5c9a0ff5a4fdcf373d251aaec2584a172aab1c3b\",\"width\":1920,\"height\":2560,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-04T00:01:54Z\",\"tags\":[],\"bytes\":1213552,\"type\":\"upload\",\"etag\":\"b05aa77038a09e2bd1500de1baecab1e\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767484914\\/jztkrtradnoxtpcjhd6p.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767484914\\/jztkrtradnoxtpcjhd6p.jpg\",\"asset_folder\":null,\"display_name\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\",\"original_filename\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\"}','2026-01-04 00:01:55','2026-01-04 00:01:55'),(103,'cloudinary','s3tagedtphers7hkt4la','https://res.cloudinary.com/dj7ljwprv/video/upload/v1767484915/s3tagedtphers7hkt4la.mp4',NULL,'2025-12-31 19-14-17','video/mp4',1448697,1920,1080,'video',3,1,'{\"asset_id\":\"d5059c36325756a97287ec6852e6dce9\",\"public_id\":\"s3tagedtphers7hkt4la\",\"version\":1767484915,\"version_id\":\"e19878341adbd74104a3f86beaaa989b\",\"signature\":\"036b5825dc3e7180e19de25850c332e22051d2c2\",\"width\":1920,\"height\":1080,\"format\":\"mp4\",\"resource_type\":\"video\",\"created_at\":\"2026-01-04T00:01:55Z\",\"tags\":[],\"pages\":0,\"bytes\":1448697,\"type\":\"upload\",\"etag\":\"74bacd519acd497538ab2b2e8165e8a6\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767484915\\/s3tagedtphers7hkt4la.mp4\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767484915\\/s3tagedtphers7hkt4la.mp4\",\"playback_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/sp_auto\\/v1767484915\\/s3tagedtphers7hkt4la.m3u8\",\"asset_folder\":null,\"display_name\":\"2025-12-31 19-14-17\",\"audio\":{\"codec\":\"aac\",\"bit_rate\":\"81901\",\"frequency\":48000,\"channels\":2,\"channel_layout\":\"stereo\"},\"video\":{\"pix_format\":\"yuv420p\",\"codec\":\"h264\",\"level\":42,\"profile\":\"High\",\"bit_rate\":\"6003073\",\"dar\":\"16:9\",\"time_base\":\"1\\/15360\"},\"is_audio\":false,\"frame_rate\":60,\"bit_rate\":6099776,\"duration\":1.9,\"rotation\":0,\"original_filename\":\"2025-12-31 19-14-17\",\"nb_frames\":114}','2026-01-04 00:01:57','2026-01-04 00:01:57'),(104,'cloudinary','a4jhtiqgebqr70ul5gnl','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767485137/a4jhtiqgebqr70ul5gnl.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"7b208a5da23f2d27a0b5b2f5bfd8cbf2\",\"public_id\":\"a4jhtiqgebqr70ul5gnl\",\"version\":1767485137,\"version_id\":\"68a61025e9535965bb76ffaa63ffaf28\",\"signature\":\"854f867f313b71959f3e086bf8b8edaf191406c4\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-04T00:05:37Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767485137\\/a4jhtiqgebqr70ul5gnl.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767485137\\/a4jhtiqgebqr70ul5gnl.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-04 00:05:38','2026-01-04 00:05:38'),(105,'cloudinary','nbs0vrbdepjxcwibxbxx','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767485139/nbs0vrbdepjxcwibxbxx.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"fc755d3f2b9b21c9adcb3fb15851661a\",\"public_id\":\"nbs0vrbdepjxcwibxbxx\",\"version\":1767485139,\"version_id\":\"6228d1fa71d45960db49bfd329e55db2\",\"signature\":\"c4ce5c213bc3efe7b2ea8dd373cc184a49091bd2\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-04T00:05:39Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767485139\\/nbs0vrbdepjxcwibxbxx.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767485139\\/nbs0vrbdepjxcwibxbxx.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-04 00:05:39','2026-01-04 00:05:39'),(106,'cloudinary','edopcmjbtd8fjqsuzq7d','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767485140/edopcmjbtd8fjqsuzq7d.jpg',NULL,'z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa','image/jpeg',1213552,1920,2560,'image',3,1,'{\"asset_id\":\"327e430a0c06553491b0edf0ac58fdb7\",\"public_id\":\"edopcmjbtd8fjqsuzq7d\",\"version\":1767485140,\"version_id\":\"791e339e1d459004771e6ad201d10955\",\"signature\":\"8977d2cbe24f12748d9fb0cfbf684c31ac66d740\",\"width\":1920,\"height\":2560,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-04T00:05:40Z\",\"tags\":[],\"bytes\":1213552,\"type\":\"upload\",\"etag\":\"b05aa77038a09e2bd1500de1baecab1e\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767485140\\/edopcmjbtd8fjqsuzq7d.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767485140\\/edopcmjbtd8fjqsuzq7d.jpg\",\"asset_folder\":null,\"display_name\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\",\"original_filename\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\"}','2026-01-04 00:05:41','2026-01-04 00:05:41'),(107,'cloudinary','jm5br2uutpvazxsrer2l','https://res.cloudinary.com/dj7ljwprv/video/upload/v1767485141/jm5br2uutpvazxsrer2l.mp4',NULL,'2025-12-31 19-14-17','video/mp4',1448697,1920,1080,'video',3,1,'{\"asset_id\":\"e17c900752ce4cf339c71ac7407e1c4b\",\"public_id\":\"jm5br2uutpvazxsrer2l\",\"version\":1767485141,\"version_id\":\"e55bbbaac5270dba5ab08ca25b8742d8\",\"signature\":\"c6bff42d68df6575d69215360028ba22bc3b2cf0\",\"width\":1920,\"height\":1080,\"format\":\"mp4\",\"resource_type\":\"video\",\"created_at\":\"2026-01-04T00:05:41Z\",\"tags\":[],\"pages\":0,\"bytes\":1448697,\"type\":\"upload\",\"etag\":\"74bacd519acd497538ab2b2e8165e8a6\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767485141\\/jm5br2uutpvazxsrer2l.mp4\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767485141\\/jm5br2uutpvazxsrer2l.mp4\",\"playback_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/sp_auto\\/v1767485141\\/jm5br2uutpvazxsrer2l.m3u8\",\"asset_folder\":null,\"display_name\":\"2025-12-31 19-14-17\",\"audio\":{\"codec\":\"aac\",\"bit_rate\":\"81901\",\"frequency\":48000,\"channels\":2,\"channel_layout\":\"stereo\"},\"video\":{\"pix_format\":\"yuv420p\",\"codec\":\"h264\",\"level\":42,\"profile\":\"High\",\"bit_rate\":\"6003073\",\"dar\":\"16:9\",\"time_base\":\"1\\/15360\"},\"is_audio\":false,\"frame_rate\":60,\"bit_rate\":6099776,\"duration\":1.9,\"rotation\":0,\"original_filename\":\"2025-12-31 19-14-17\",\"nb_frames\":114}','2026-01-04 00:05:43','2026-01-04 00:05:43'),(108,'cloudinary','rn6qhm0xuagbaqvuw3wi','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767485277/rn6qhm0xuagbaqvuw3wi.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"d71d5b534ef47a6a64c8b2f489f7018e\",\"public_id\":\"rn6qhm0xuagbaqvuw3wi\",\"version\":1767485277,\"version_id\":\"2cc509540b20f622975bb1259ad565df\",\"signature\":\"c47ea4c70ed97cd6f505a0f9df48c49b78719e8e\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-04T00:07:57Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767485277\\/rn6qhm0xuagbaqvuw3wi.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767485277\\/rn6qhm0xuagbaqvuw3wi.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-04 00:07:57','2026-01-04 00:07:57'),(109,'cloudinary','fjekzattiazerxpyw4xr','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767485277/fjekzattiazerxpyw4xr.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"f18b6e5e766a88f29b69ae72ad37aa17\",\"public_id\":\"fjekzattiazerxpyw4xr\",\"version\":1767485277,\"version_id\":\"3e6e023a0b2ccd548ce36d277cec48fb\",\"signature\":\"625733d1a65a181464d9d70c87f79b30de0625d5\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-04T00:07:57Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767485277\\/fjekzattiazerxpyw4xr.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767485277\\/fjekzattiazerxpyw4xr.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-04 00:07:58','2026-01-04 00:07:58'),(110,'cloudinary','btymbgcloaitgn0ch9ma','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767485279/btymbgcloaitgn0ch9ma.jpg',NULL,'z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa','image/jpeg',1213552,1920,2560,'image',3,1,'{\"asset_id\":\"50cc54b18a961817dd941df697bb834d\",\"public_id\":\"btymbgcloaitgn0ch9ma\",\"version\":1767485279,\"version_id\":\"efc4e10cbd9a681a95596d69264d1662\",\"signature\":\"a89babc8bb9a9b4e2e121d8219d1ec5ec079a207\",\"width\":1920,\"height\":2560,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-04T00:07:59Z\",\"tags\":[],\"bytes\":1213552,\"type\":\"upload\",\"etag\":\"b05aa77038a09e2bd1500de1baecab1e\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767485279\\/btymbgcloaitgn0ch9ma.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767485279\\/btymbgcloaitgn0ch9ma.jpg\",\"asset_folder\":null,\"display_name\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\",\"original_filename\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\"}','2026-01-04 00:07:59','2026-01-04 00:07:59'),(111,'cloudinary','svileavoncenkncdus2x','https://res.cloudinary.com/dj7ljwprv/video/upload/v1767485280/svileavoncenkncdus2x.mp4',NULL,'2025-12-31 19-14-17','video/mp4',1448697,1920,1080,'video',3,1,'{\"asset_id\":\"0a0f08a8835c2558197a930b365d70ef\",\"public_id\":\"svileavoncenkncdus2x\",\"version\":1767485280,\"version_id\":\"809b1f708ef023b6369d44d2f4e6efea\",\"signature\":\"a3b5730aa82767ea4afd0bca8ca6b78602fbae18\",\"width\":1920,\"height\":1080,\"format\":\"mp4\",\"resource_type\":\"video\",\"created_at\":\"2026-01-04T00:08:00Z\",\"tags\":[],\"pages\":0,\"bytes\":1448697,\"type\":\"upload\",\"etag\":\"74bacd519acd497538ab2b2e8165e8a6\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767485280\\/svileavoncenkncdus2x.mp4\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767485280\\/svileavoncenkncdus2x.mp4\",\"playback_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/sp_auto\\/v1767485280\\/svileavoncenkncdus2x.m3u8\",\"asset_folder\":null,\"display_name\":\"2025-12-31 19-14-17\",\"audio\":{\"codec\":\"aac\",\"bit_rate\":\"81901\",\"frequency\":48000,\"channels\":2,\"channel_layout\":\"stereo\"},\"video\":{\"pix_format\":\"yuv420p\",\"codec\":\"h264\",\"level\":42,\"profile\":\"High\",\"bit_rate\":\"6003073\",\"dar\":\"16:9\",\"time_base\":\"1\\/15360\"},\"is_audio\":false,\"frame_rate\":60,\"bit_rate\":6099776,\"duration\":1.9,\"rotation\":0,\"original_filename\":\"2025-12-31 19-14-17\",\"nb_frames\":114}','2026-01-04 00:08:01','2026-01-04 00:08:01'),(112,'cloudinary','y49f9wdr9o4lwqpb1nfl','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767536087/y49f9wdr9o4lwqpb1nfl.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',4,1,'{\"asset_id\":\"8b6c2e4f9b2f8aa99cd1cbf1d0d00199\",\"public_id\":\"y49f9wdr9o4lwqpb1nfl\",\"version\":1767536087,\"version_id\":\"f8441d17ea16f28ff36c5646ebb8b8c1\",\"signature\":\"03fae292a85dd9e48ce880c972c3b0e0df820f23\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-04T14:14:47Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767536087\\/y49f9wdr9o4lwqpb1nfl.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767536087\\/y49f9wdr9o4lwqpb1nfl.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-04 14:14:48','2026-01-04 14:14:48'),(113,'cloudinary','rabemtcnekekpbgupdax','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767536107/rabemtcnekekpbgupdax.jpg',NULL,'z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa','image/jpeg',1213552,1920,2560,'image',4,1,'{\"asset_id\":\"8f080f73087e3d7e58ef70536072be39\",\"public_id\":\"rabemtcnekekpbgupdax\",\"version\":1767536107,\"version_id\":\"4bdc02174e18c8765a1b2ce75a7a2715\",\"signature\":\"0a6588ea4cdca85e7d64ab135de7a7f948c30e98\",\"width\":1920,\"height\":2560,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-04T14:15:07Z\",\"tags\":[],\"bytes\":1213552,\"type\":\"upload\",\"etag\":\"b05aa77038a09e2bd1500de1baecab1e\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767536107\\/rabemtcnekekpbgupdax.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767536107\\/rabemtcnekekpbgupdax.jpg\",\"asset_folder\":null,\"display_name\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\",\"original_filename\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\"}','2026-01-04 14:15:08','2026-01-04 14:15:08'),(114,'cloudinary','i4ehfjfzlzvofioenvbe','https://res.cloudinary.com/dj7ljwprv/video/upload/v1767536132/i4ehfjfzlzvofioenvbe.mp4',NULL,'2025-12-31 19-14-17','video/mp4',1448697,1920,1080,'video',4,1,'{\"asset_id\":\"ca50f4e0d7c2a14d21ca4fa659deac8a\",\"public_id\":\"i4ehfjfzlzvofioenvbe\",\"version\":1767536132,\"version_id\":\"7f5024fade2c24eeedf593dfe7838152\",\"signature\":\"e573a8ad06329db9e465c4acaa6a63ce8e34b892\",\"width\":1920,\"height\":1080,\"format\":\"mp4\",\"resource_type\":\"video\",\"created_at\":\"2026-01-04T14:15:32Z\",\"tags\":[],\"pages\":0,\"bytes\":1448697,\"type\":\"upload\",\"etag\":\"74bacd519acd497538ab2b2e8165e8a6\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767536132\\/i4ehfjfzlzvofioenvbe.mp4\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767536132\\/i4ehfjfzlzvofioenvbe.mp4\",\"playback_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/sp_auto\\/v1767536132\\/i4ehfjfzlzvofioenvbe.m3u8\",\"asset_folder\":null,\"display_name\":\"2025-12-31 19-14-17\",\"audio\":{\"codec\":\"aac\",\"bit_rate\":\"81901\",\"frequency\":48000,\"channels\":2,\"channel_layout\":\"stereo\"},\"video\":{\"pix_format\":\"yuv420p\",\"codec\":\"h264\",\"level\":42,\"profile\":\"High\",\"bit_rate\":\"6003073\",\"dar\":\"16:9\",\"time_base\":\"1\\/15360\"},\"is_audio\":false,\"frame_rate\":60,\"bit_rate\":6099776,\"duration\":1.9,\"rotation\":0,\"original_filename\":\"2025-12-31 19-14-17\",\"nb_frames\":114}','2026-01-04 14:15:33','2026-01-04 14:15:33');
/*!40000 ALTER TABLE `files` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `interactions`
--

DROP TABLE IF EXISTS `interactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `interactions` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `target_type` enum('post','message','user','other') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'post',
  `target_id` bigint DEFAULT NULL,
  `user_id` bigint NOT NULL,
  `parent_id` bigint DEFAULT NULL,
  `interaction_type` enum('favorite','feedback','report') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `rating` tinyint unsigned DEFAULT NULL,
  `comment` text CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci,
  `reason_id` int DEFAULT NULL,
  `reason_text` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `meta` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin,
  `status` enum('pending','in_progress','reviewed','dismissed') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_interactions_reason` (`reason_id`) USING BTREE,
  KEY `idx_interactions_target` (`target_type`,`target_id`) USING BTREE,
  KEY `idx_interactions_user` (`user_id`) USING BTREE,
  KEY `idx_interactions_type_status` (`interaction_type`,`status`) USING BTREE,
  KEY `idx_interactions_created` (`created_at`) USING BTREE,
  KEY `fk_interactions_parent` (`parent_id`),
  CONSTRAINT `fk_interactions_parent` FOREIGN KEY (`parent_id`) REFERENCES `interactions` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_interactions_reason` FOREIGN KEY (`reason_id`) REFERENCES `report_reasons` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_interactions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interactions`
--

LOCK TABLES `interactions` WRITE;
/*!40000 ALTER TABLE `interactions` DISABLE KEYS */;
INSERT INTO `interactions` VALUES (1,'post',4,3,NULL,'feedback',NULL,'123',NULL,NULL,NULL,NULL,'2026-01-03 13:07:26','2026-01-03 13:07:26'),(2,'post',4,3,NULL,'feedback',NULL,'hi',NULL,NULL,NULL,NULL,'2026-01-03 13:07:47','2026-01-03 13:07:47'),(3,'post',4,3,NULL,'feedback',NULL,'123132',NULL,NULL,NULL,NULL,'2026-01-03 13:07:49','2026-01-03 13:07:49'),(4,'post',4,3,NULL,'feedback',NULL,'aaaa',NULL,NULL,NULL,NULL,'2026-01-03 13:07:53','2026-01-03 13:07:53'),(12,'post',4,3,NULL,'report',NULL,NULL,5,'Nội dung không phù hợp - sss',NULL,NULL,'2026-01-03 22:37:20','2026-01-03 22:37:20'),(13,'post',8,3,NULL,'feedback',NULL,'hello',NULL,NULL,NULL,NULL,'2026-01-03 23:54:49','2026-01-03 23:54:49'),(18,'post',4,3,NULL,'favorite',NULL,NULL,NULL,NULL,NULL,NULL,'2026-01-04 01:33:30','2026-01-04 01:33:30'),(19,'post',5,3,NULL,'favorite',NULL,NULL,NULL,NULL,NULL,NULL,'2026-01-04 01:38:43','2026-01-04 01:38:43'),(20,'post',8,3,NULL,'favorite',NULL,NULL,NULL,NULL,NULL,NULL,'2026-01-04 01:38:45','2026-01-04 01:38:45');
/*!40000 ALTER TABLE `interactions` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `message_attachments`
--

DROP TABLE IF EXISTS `message_attachments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `message_attachments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `message_id` bigint NOT NULL,
  `file_id` bigint NOT NULL,
  `file_order` int DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `unique_file_id` (`file_id`) USING BTREE,
  KEY `idx_message_attachments_message` (`message_id`) USING BTREE,
  KEY `idx_message_attachments_file` (`file_id`) USING BTREE,
  CONSTRAINT `message_attachments_ibfk_1` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `message_attachments_ibfk_2` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `message_attachments`
--

LOCK TABLES `message_attachments` WRITE;
/*!40000 ALTER TABLE `message_attachments` DISABLE KEYS */;
/*!40000 ALTER TABLE `message_attachments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `messages`
--

DROP TABLE IF EXISTS `messages`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `messages` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `conversation_id` int unsigned DEFAULT NULL,
  `sender_id` bigint NOT NULL,
  `receiver_id` bigint NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `status` enum('sending','sent','failed','deleted') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sent',
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_messages_sender` (`sender_id`) USING BTREE,
  KEY `fk_messages_receiver` (`receiver_id`) USING BTREE,
  KEY `fk_messages_conversation` (`conversation_id`),
  CONSTRAINT `fk_messages_conversation` FOREIGN KEY (`conversation_id`) REFERENCES `conversations` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_messages_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_messages_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=73 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
INSERT INTO `messages` VALUES (1,3,4,3,'hello',1,'2026-01-04 13:07:47','sent','2026-01-04 14:30:24'),(2,3,4,3,'hello',1,'2026-01-04 13:15:08','sent','2026-01-04 14:30:24'),(3,3,4,3,'alooo',1,'2026-01-04 13:56:10','sent','2026-01-04 14:30:24'),(4,3,3,4,'hello',1,'2026-01-04 14:04:00','sent','2026-01-04 14:46:10'),(5,3,4,3,'hi',1,'2026-01-04 14:04:17','sent','2026-01-04 14:30:24'),(6,3,4,3,'a',1,'2026-01-04 14:07:58','sent','2026-01-04 14:30:24'),(7,3,4,3,'a',1,'2026-01-04 14:08:09','sent','2026-01-04 14:30:24'),(8,3,3,4,'baw',1,'2026-01-04 14:11:17','sent','2026-01-04 14:46:10'),(9,3,4,3,'ss',1,'2026-01-04 14:11:34','sent','2026-01-04 14:30:24'),(10,3,3,4,'aloo',1,'2026-01-04 14:45:26','sent','2026-01-04 14:46:10'),(11,3,4,3,'alo',1,'2026-01-04 14:46:26','sent','2026-01-04 14:46:47'),(12,3,4,3,'we',1,'2026-01-04 14:46:37','sent','2026-01-04 14:46:47'),(13,3,4,3,'alo',1,'2026-01-04 14:49:50','sent','2026-01-04 14:50:11'),(14,3,3,4,'alo',1,'2026-01-04 14:50:39','sent','2026-01-04 14:55:49'),(15,3,4,3,'alo',1,'2026-01-04 14:55:56','sent','2026-01-04 14:57:45'),(16,3,3,4,'we',1,'2026-01-04 14:57:53','sent','2026-01-04 14:58:18'),(17,3,4,3,'weassad',1,'2026-01-04 15:01:38','sent','2026-01-04 15:01:46'),(18,3,3,4,'abcs',1,'2026-01-04 15:02:01','sent','2026-01-04 15:06:04'),(19,3,3,4,'ssdaads',1,'2026-01-04 15:02:25','sent','2026-01-04 15:06:04'),(20,3,4,3,'sdsdasd',1,'2026-01-04 15:06:09','sent','2026-01-04 15:06:25'),(21,3,4,3,'aloo',1,'2026-01-04 15:06:18','sent','2026-01-04 15:06:25'),(22,3,3,4,'alo',1,'2026-01-04 15:10:26','sent','2026-01-04 15:10:36'),(23,3,4,3,'alo',1,'2026-01-04 15:10:39','sent','2026-01-04 15:10:43'),(24,3,4,3,'alo',1,'2026-01-04 15:23:30','sent','2026-01-04 15:23:42'),(25,3,4,3,'sd',1,'2026-01-04 15:32:15','sent','2026-01-04 15:36:01'),(26,3,4,3,'sd',1,'2026-01-04 15:35:14','sent','2026-01-04 15:36:01'),(27,3,4,3,'sd',1,'2026-01-04 15:38:09','sent','2026-01-04 15:40:01'),(28,3,4,3,'aloo',1,'2026-01-04 15:46:41','sent','2026-01-04 15:46:52'),(29,3,4,3,'123',1,'2026-01-04 15:47:15','sent','2026-01-04 15:56:01'),(30,3,3,4,'123',1,'2026-01-04 15:56:05','sent','2026-01-04 15:56:18'),(31,3,4,3,'ưqeqwe',1,'2026-01-04 15:56:48','sent','2026-01-04 15:56:57'),(32,3,4,3,'acx',1,'2026-01-04 15:58:18','sent','2026-01-04 15:58:27'),(33,3,4,3,'ưewwe',1,'2026-01-04 15:58:34','sent','2026-01-04 15:58:41'),(34,3,4,3,'123',1,'2026-01-04 16:04:01','sent','2026-01-04 16:04:05'),(35,3,3,4,'123',1,'2026-01-04 16:04:11','sent','2026-01-04 16:04:14'),(36,3,4,3,'123',1,'2026-01-04 16:08:28','sent','2026-01-04 16:08:31'),(37,3,4,3,'aa',1,'2026-01-04 16:08:37','sent','2026-01-04 16:08:40'),(38,3,4,3,'32',1,'2026-01-04 16:08:51','sent','2026-01-04 16:08:54'),(39,3,4,3,'ấd',1,'2026-01-04 16:18:44','sent','2026-01-04 16:18:54'),(40,3,3,4,'123',1,'2026-01-04 16:19:22','sent','2026-01-04 16:19:35'),(41,3,4,3,'sds',1,'2026-01-04 16:20:55','sent','2026-01-04 16:21:09'),(42,3,4,3,'vcvc',1,'2026-01-04 16:21:23','sent','2026-01-04 16:21:36'),(43,3,4,3,'dssd',1,'2026-01-04 16:23:26','sent','2026-01-04 16:23:34'),(44,3,4,3,'vbvb',1,'2026-01-04 16:26:06','sent','2026-01-04 16:26:13'),(45,3,3,4,'sdsd',1,'2026-01-04 16:26:21','sent','2026-01-04 16:26:28'),(46,3,4,3,'123',1,'2026-01-04 16:54:31','sent','2026-01-04 16:54:37'),(47,3,4,3,'scxs',1,'2026-01-04 16:54:49','sent','2026-01-04 16:54:54'),(48,3,3,4,'123',1,'2026-01-04 17:09:12','sent','2026-01-04 17:48:15'),(49,3,4,3,'sđs',1,'2026-01-04 17:09:24','sent','2026-01-04 17:09:37'),(50,3,4,3,'sds',1,'2026-01-04 17:16:50','sent','2026-01-04 17:17:58'),(51,3,4,3,'123',1,'2026-01-04 17:17:03','sent','2026-01-04 17:17:58'),(52,3,3,4,'dsdssd',1,'2026-01-04 17:17:31','sent','2026-01-04 17:48:15'),(53,3,4,3,'132132',1,'2026-01-04 17:17:49','sent','2026-01-04 17:17:58'),(54,3,4,3,'sdaasd',1,'2026-01-04 17:25:19','sent','2026-01-04 17:31:52'),(55,3,4,3,'sd',1,'2026-01-04 17:32:02','sent','2026-01-04 17:35:14'),(56,3,4,3,'123',1,'2026-01-04 17:33:54','sent','2026-01-04 17:35:14'),(57,4,3,3,'123',1,'2026-01-04 17:35:37','sent','2026-01-04 17:44:48'),(58,3,4,3,'23',1,'2026-01-04 17:45:07','sent','2026-01-04 17:47:41'),(59,3,4,3,'12',1,'2026-01-04 17:45:17','sent','2026-01-04 17:47:41'),(60,3,3,4,'sdssd',1,'2026-01-04 17:48:06','sent','2026-01-04 17:48:15'),(61,3,4,3,'123',1,'2026-01-04 17:58:43','sent','2026-01-04 18:05:43'),(62,3,4,3,'abc',1,'2026-01-04 17:58:56','sent','2026-01-04 18:05:43'),(63,3,4,3,'sdsdasd',1,'2026-01-04 17:59:07','sent','2026-01-04 18:05:43'),(64,3,3,4,'sdsdads',0,'2026-01-04 17:59:11','sent','2026-01-04 17:59:11'),(65,3,3,4,'vcasasdasd',0,'2026-01-04 17:59:21','sent','2026-01-04 17:59:21'),(66,3,4,3,'sdsdsdsd',1,'2026-01-04 18:00:14','sent','2026-01-04 18:05:43'),(67,3,4,3,'123',1,'2026-01-04 18:05:54','sent','2026-01-04 18:21:19'),(68,3,3,4,'12313',0,'2026-01-04 18:08:39','sent','2026-01-04 18:08:39'),(69,3,4,3,'ádsad',1,'2026-01-04 18:08:49','sent','2026-01-04 18:21:19'),(70,3,4,3,'123',1,'2026-01-04 18:21:09','sent','2026-01-04 18:21:19'),(71,3,4,3,'sdsdsa',1,'2026-01-04 18:21:16','sent','2026-01-04 18:21:19'),(72,3,3,4,'12123',0,'2026-01-04 18:21:23','sent','2026-01-04 18:21:23');
/*!40000 ALTER TABLE `messages` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `minigame_types`
--

DROP TABLE IF EXISTS `minigame_types`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `minigame_types` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(100) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL COMMENT 'Tên loại minigame, ví dụ: Quay thưởng, Lật thẻ, Đoán số',
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci COMMENT 'Mô tả chi tiết cách chơi',
  `rule` longtext CHARACTER SET utf8mb4 COLLATE utf8mb4_bin COMMENT 'Luật chơi lưu dạng JSON, backend đọc và xử lý',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `minigame_types`
--

LOCK TABLES `minigame_types` WRITE;
/*!40000 ALTER TABLE `minigame_types` DISABLE KEYS */;
/*!40000 ALTER TABLE `minigame_types` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `models`
--

DROP TABLE IF EXISTS `models`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `models` (
  `id` int NOT NULL AUTO_INCREMENT,
  `name` varchar(255) NOT NULL,
  `brand_id` int DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `brand_id` (`brand_id`),
  KEY `category_id` (`category_id`),
  CONSTRAINT `models_ibfk_1` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  CONSTRAINT `models_ibfk_2` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=18 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `models`
--

LOCK TABLES `models` WRITE;
/*!40000 ALTER TABLE `models` DISABLE KEYS */;
INSERT INTO `models` VALUES (1,'iPhone 14',1,NULL,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(2,'iPhone 15 Pro Max',1,NULL,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(3,'Galaxy S23 Ultra',2,NULL,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(4,'Xiaomi 13',3,NULL,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(5,'XPS 13',4,NULL,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(6,'Inspiron 15',4,NULL,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(7,'Aspire 7',5,NULL,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(8,'ZenBook 14',6,NULL,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(9,'Bravia OLED',7,NULL,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(10,'LG NanoCell',8,NULL,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(11,'JBL PartyBox',9,NULL,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(12,'Nồi chiên không dầu',NULL,16,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(13,'Nồi lẩu điện',NULL,16,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(14,'Lò nướng điện',NULL,16,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(15,'Cây Bonsai',NULL,20,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(16,'Cây Xương rồng',NULL,20,'2025-12-31 18:00:19','2025-12-31 18:00:19'),(17,'Đèn trang trí treo tường',NULL,20,'2025-12-31 18:00:19','2025-12-31 18:00:19');
/*!40000 ALTER TABLE `models` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `orders`
--

DROP TABLE IF EXISTS `orders`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `orders` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `message_id` bigint NOT NULL COMMENT 'Khóa ngoại đến messages.id',
  `post_id` bigint NOT NULL COMMENT 'Sản phẩm đã bán trong giao dịch này',
  `status` enum('created','completed','cancelled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'created',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP COMMENT 'Thời điểm người bán xác nhận bắt đầu giao dịch',
  `completed_at` timestamp NULL DEFAULT NULL COMMENT 'Thời điểm kết thúc giao dịch (hoàn tất, huỷ, tranh chấp)',
  `note` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL COMMENT 'Ghi chú thêm về giao dịch',
  `updated_at` datetime DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `idx_orders_message` (`message_id`) USING BTREE,
  KEY `idx_orders_post` (`post_id`) USING BTREE,
  CONSTRAINT `fk_orders_message` FOREIGN KEY (`message_id`) REFERENCES `messages` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  CONSTRAINT `fk_orders_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE RESTRICT ON UPDATE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `orders`
--

LOCK TABLES `orders` WRITE;
/*!40000 ALTER TABLE `orders` DISABLE KEYS */;
/*!40000 ALTER TABLE `orders` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `payments`
--

DROP TABLE IF EXISTS `payments`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `payments` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `post_id` bigint DEFAULT NULL,
  `amount` decimal(13,2) NOT NULL,
  `payment_method` enum('momo','bank_transfer') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `status` enum('pending','success','failed','canceled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `transaction_id` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `payment_proof_url` varchar(500) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `wc_used` decimal(13,2) DEFAULT '0.00' COMMENT 'Số đồng WellCoin (WC) người dùng sử dụng để trừ phí thanh toán',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_payments_user` (`user_id`) USING BTREE,
  KEY `fk_payments_post` (`post_id`),
  CONSTRAINT `fk_payments_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE,
  CONSTRAINT `fk_payments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
INSERT INTO `payments` VALUES (5,3,NULL,6000.00,'bank_transfer','success','64864864-935c-4a4e-b28a-a6a1b46cfa23',NULL,'[]','2026-01-02 08:24:02','2026-01-02 08:24:02',0.00),(6,3,NULL,6000.00,'bank_transfer','success','3b1450be-acc0-41f0-b95e-b7cc2978a53b',NULL,'[]','2026-01-02 09:07:03','2026-01-02 09:07:04',0.00),(7,3,NULL,6000.00,'bank_transfer','success','b93fc6fd-b9d1-4a9f-aef3-a40b9d720e5e',NULL,'[]','2026-01-02 09:13:59','2026-01-02 09:13:59',0.00),(8,3,NULL,6000.00,'bank_transfer','success','f389ff31-e1dc-4f58-9be0-552028c17b43',NULL,'[]','2026-01-02 09:19:40','2026-01-02 09:19:40',0.00),(9,3,NULL,6000.00,'bank_transfer','success','fc57f92d-6504-4d65-ab93-d3e57c8795da',NULL,'[]','2026-01-02 09:25:29','2026-01-02 09:25:29',0.00),(10,3,NULL,5000.00,'bank_transfer','success','88726cfd-055b-4aa8-a178-18b9de720a84',NULL,'[]','2026-01-02 09:38:08','2026-01-02 09:38:09',1000.00),(11,3,NULL,5000.00,'bank_transfer','success','b9c9828f-a369-4b18-a0ea-cb42b3fbdb9f',NULL,'[]','2026-01-02 10:24:04','2026-01-02 10:24:05',1000.00),(12,3,NULL,5000.00,'bank_transfer','success','95c95d8a-3991-4a82-ac92-801b16d2821d',NULL,'[]','2026-01-02 10:28:31','2026-01-02 10:28:31',1000.00),(13,3,NULL,4000.00,'bank_transfer','success','5de0150f-668c-47a0-83d4-5016a4c5d252',NULL,'[]','2026-01-02 10:32:53','2026-01-02 10:32:53',2000.00),(14,3,NULL,65000.00,'bank_transfer','success','0a8c303a-76ac-4e47-965d-a78c1e702051',NULL,'{\"breakdown\":{\"base\":6000,\"extra\":0,\"boost\":60000,\"wc\":1000},\"boosts\":[]}','2026-01-02 16:51:03','2026-01-02 16:51:04',1000.00),(15,3,NULL,65000.00,'bank_transfer','success','1eec83b1-e824-44b6-92a9-1714e965df29',NULL,'{\"breakdown\":{\"base\":6000,\"extra\":0,\"boost\":60000,\"wc\":1000},\"boosts\":[{\"boost_package_id\":3,\"quantity\":4,\"time_slots\":[\"08:00-09:00\",\"09:00-10:00\"],\"days\":1}]}','2026-01-02 17:08:35','2026-01-02 17:08:35',1000.00),(16,3,NULL,66000.00,'bank_transfer','success','1246ded7-15f8-476e-bbd0-db130b16f924',NULL,'{\"breakdown\":{\"base\":6000,\"extra\":0,\"boost\":60000,\"wc\":0},\"boosts\":[{\"boost_package_id\":3,\"quantity\":4,\"time_slots\":[\"08:00-09:00\",\"09:00-10:00\"],\"days\":1}]}','2026-01-02 18:04:36','2026-01-02 18:04:37',0.00),(17,3,18,66000.00,'bank_transfer','success','ca53638e-c6d8-4691-ab12-7b96b051c064',NULL,'{\"breakdown\":{\"base\":6000,\"extra\":0,\"boost\":60000,\"wc\":0},\"boosts\":[{\"boost_package_id\":3,\"quantity\":4,\"time_slots\":[\"08:00-09:00\",\"09:00-10:00\"],\"days\":1}]}','2026-01-02 18:08:00','2026-01-02 18:08:04',0.00),(18,3,19,96000.00,'bank_transfer','success','db8a0e65-375b-4586-8345-eaf6e407b224',NULL,'{\"breakdown\":{\"base\":6000,\"extra\":0,\"boost\":90000,\"wc\":0},\"boosts\":[{\"boost_package_id\":3,\"quantity\":6,\"time_slots\":[\"08:00-09:00\",\"20:00-21:00\"],\"days\":3}]}','2026-01-02 18:36:03','2026-01-02 18:36:06',0.00),(22,3,20,23000.00,'bank_transfer','success','35d09f16-293a-45c8-b162-d52849cffffb',NULL,'{\"breakdown\":{\"base\":6000,\"extra\":2000,\"boost\":15000,\"wc\":0},\"boosts\":[{\"boost_package_id\":2,\"quantity\":1}]}','2026-01-04 00:07:56','2026-01-04 00:08:01',0.00);
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_attributes`
--

DROP TABLE IF EXISTS `post_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_attributes` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `attribute_id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  `created_at` timestamp NULL DEFAULT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `uq_post_attribute` (`post_id`,`attribute_id`),
  KEY `fk_post_attributes_attribute` (`attribute_id`),
  CONSTRAINT `fk_post_attributes_attribute` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`) ON DELETE RESTRICT,
  CONSTRAINT `fk_post_attributes_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=25 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_attributes`
--

LOCK TABLES `post_attributes` WRITE;
/*!40000 ALTER TABLE `post_attributes` DISABLE KEYS */;
INSERT INTO `post_attributes` VALUES (1,18,1,'Intel Core i9',NULL,NULL),(2,19,1,'AMD Ryzen 7',NULL,NULL),(3,18,2,'8GB',NULL,NULL),(4,19,2,'32GB',NULL,NULL),(5,18,3,'512GB SSD',NULL,NULL),(6,19,3,'1TB SSD',NULL,NULL),(7,18,4,'14 inch',NULL,NULL),(8,19,4,'17 inch',NULL,NULL),(9,18,7,'macOS',NULL,NULL),(10,19,7,'Android',NULL,NULL),(11,18,8,'Trắng',NULL,NULL),(12,19,8,'Đen',NULL,NULL),(13,20,1,'AMD Ryzen 7','2026-01-04 00:08:01','2026-01-04 00:08:01'),(14,20,2,'16GB','2026-01-04 00:08:01','2026-01-04 00:08:01'),(15,20,3,'1TB SSD','2026-01-04 00:08:01','2026-01-04 00:08:01'),(16,20,4,'17 inch','2026-01-04 00:08:01','2026-01-04 00:08:01'),(17,20,7,'Windows','2026-01-04 00:08:01','2026-01-04 00:08:01'),(18,20,8,'Bạc','2026-01-04 00:08:01','2026-01-04 00:08:01'),(19,21,1,'AMD Ryzen 7','2026-01-04 14:15:34','2026-01-04 14:15:34'),(20,21,2,'32GB','2026-01-04 14:15:34','2026-01-04 14:15:34'),(21,21,3,'1TB SSD','2026-01-04 14:15:34','2026-01-04 14:15:34'),(22,21,4,'15.6 inch','2026-01-04 14:15:34','2026-01-04 14:15:34'),(23,21,7,'Windows','2026-01-04 14:15:34','2026-01-04 14:15:34'),(24,21,8,'Đỏ','2026-01-04 14:15:34','2026-01-04 14:15:34');
/*!40000 ALTER TABLE `post_attributes` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_boosts`
--

DROP TABLE IF EXISTS `post_boosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_boosts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint DEFAULT NULL,
  `boost_package_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  `start_at` datetime DEFAULT NULL,
  `end_at` datetime DEFAULT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_post_boosts_package` (`boost_package_id`) USING BTREE,
  KEY `fk_post_boosts_post` (`post_id`),
  CONSTRAINT `fk_post_boosts_package` FOREIGN KEY (`boost_package_id`) REFERENCES `boost_packages` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_post_boosts_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_boosts`
--

LOCK TABLES `post_boosts` WRITE;
/*!40000 ALTER TABLE `post_boosts` DISABLE KEYS */;
INSERT INTO `post_boosts` VALUES (1,18,3,4,'2026-01-02 18:08:04','2026-01-02 10:00:00','2026-01-02 18:08:04','2026-01-02 18:08:04'),(2,19,3,6,'2026-01-02 18:36:06','2026-01-04 21:00:00','2026-01-02 18:36:06','2026-01-02 18:36:06'),(3,20,2,1,'2026-01-04 00:08:01','2026-01-04 01:08:01','2026-01-04 00:08:01','2026-01-04 00:08:01');
/*!40000 ALTER TABLE `post_boosts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_medias`
--

DROP TABLE IF EXISTS `post_medias`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_medias` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `position` int DEFAULT '0',
  `is_primary` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `file_id` bigint NOT NULL,
  `updated_at` timestamp NULL DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `unique_file_id` (`file_id`) USING BTREE,
  KEY `fk_post_images_post` (`post_id`) USING BTREE,
  CONSTRAINT `fk_post_images_file` FOREIGN KEY (`file_id`) REFERENCES `files` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_post_images_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=31 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_medias`
--

LOCK TABLES `post_medias` WRITE;
/*!40000 ALTER TABLE `post_medias` DISABLE KEYS */;
INSERT INTO `post_medias` VALUES (1,4,0,1,'2026-01-01 19:01:04',47,'2026-01-01 19:01:04'),(2,5,0,1,'2026-01-01 19:16:03',48,'2026-01-01 19:16:03'),(3,5,1,0,'2026-01-01 19:16:03',49,'2026-01-01 19:16:03'),(4,5,2,0,'2026-01-01 19:16:03',50,'2026-01-01 19:16:03'),(5,5,0,0,'2026-01-01 19:16:03',51,'2026-01-01 19:16:03'),(6,6,0,1,'2026-01-02 05:08:06',76,'2026-01-02 05:08:06'),(7,6,1,0,'2026-01-02 05:08:06',77,'2026-01-02 05:08:06'),(8,6,2,0,'2026-01-02 05:08:06',78,'2026-01-02 05:08:06'),(9,7,0,1,'2026-01-02 05:09:19',79,'2026-01-02 05:09:19'),(10,7,1,0,'2026-01-02 05:09:19',80,'2026-01-02 05:09:19'),(11,7,2,0,'2026-01-02 05:09:19',81,'2026-01-02 05:09:19'),(12,8,0,1,'2026-01-02 09:07:14',82,'2026-01-02 09:07:14'),(13,9,0,1,'2026-01-02 09:14:03',83,'2026-01-02 09:14:03'),(14,10,0,1,'2026-01-02 09:19:44',84,'2026-01-02 09:19:44'),(15,11,0,1,'2026-01-02 09:25:32',85,'2026-01-02 09:25:32'),(16,12,0,1,'2026-01-02 09:38:14',86,'2026-01-02 09:38:14'),(18,14,0,1,'2026-01-02 10:28:33',88,'2026-01-02 10:28:33'),(19,15,0,1,'2026-01-02 10:32:56',89,'2026-01-02 10:32:56'),(20,16,0,1,'2026-01-02 16:51:08',90,'2026-01-02 16:51:08'),(21,17,0,1,'2026-01-02 17:08:38',91,'2026-01-02 17:08:38'),(22,18,0,1,'2026-01-02 18:08:04',93,'2026-01-02 18:08:04'),(23,19,0,1,'2026-01-02 18:36:06',94,'2026-01-02 18:36:06'),(24,20,0,1,'2026-01-04 00:08:01',108,'2026-01-04 00:08:01'),(25,20,1,0,'2026-01-04 00:08:01',109,'2026-01-04 00:08:01'),(26,20,2,0,'2026-01-04 00:08:01',110,'2026-01-04 00:08:01'),(27,20,0,0,'2026-01-04 00:08:01',111,'2026-01-04 00:08:01'),(28,21,0,1,'2026-01-04 14:15:34',112,'2026-01-04 14:15:34'),(29,21,1,0,'2026-01-04 14:15:34',113,'2026-01-04 14:15:34'),(30,21,0,0,'2026-01-04 14:15:34',114,'2026-01-04 14:15:34');
/*!40000 ALTER TABLE `post_medias` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `posts`
--

DROP TABLE IF EXISTS `posts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `posts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `product_id` bigint DEFAULT NULL,
  `category_id` int DEFAULT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `price` decimal(13,2) NOT NULL,
  `item_condition` enum('new','used','like_new') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'used',
  `location` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `post_status` enum('active','hidden','waiting_approval','rejected','need_to_extend') COLLATE utf8mb4_unicode_ci DEFAULT 'waiting_approval',
  `views_count` bigint DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `warranty` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_posts_product` (`product_id`) USING BTREE,
  KEY `idx_posts_category` (`category_id`) USING BTREE,
  KEY `idx_posts_user` (`user_id`) USING BTREE,
  FULLTEXT KEY `ft_posts_title_description` (`title`,`description`),
  CONSTRAINT `fk_posts_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_posts_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_posts_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (4,3,42,20,'sd','sdsd',123123.00,'new','132123','waiting_approval',0,'2026-01-01 19:01:04','2026-01-01 19:01:04','no'),(5,3,43,2,'123123','123123',123123.00,'new','21313','waiting_approval',0,'2026-01-01 19:16:03','2026-01-01 19:16:03','1m'),(6,3,42,20,'213','123',123.00,'new','123123','waiting_approval',0,'2026-01-02 05:08:06','2026-01-02 05:08:06','6m'),(7,3,44,3,'213123','123123',123123.00,'new','123213','waiting_approval',0,'2026-01-02 05:09:19','2026-01-02 05:09:19','6m'),(8,3,42,20,'123123','123123',123123.00,'used','123123','waiting_approval',0,'2026-01-02 09:07:14','2026-01-02 09:07:14','6m'),(9,3,45,2,'123213','13123',123123.00,'new','213123','waiting_approval',0,'2026-01-02 09:14:03','2026-01-02 09:14:03','3m'),(10,3,42,20,'123123','123123',123123.00,'used','23123','waiting_approval',0,'2026-01-02 09:19:44','2026-01-02 09:19:44','6m'),(11,3,46,16,'123123','123123123',131321.00,'new','1231231','waiting_approval',0,'2026-01-02 09:25:32','2026-01-02 09:25:32','1m'),(12,3,47,5,'213123','123123123',1231231.00,'new','123123321132','waiting_approval',0,'2026-01-02 09:38:14','2026-01-02 09:38:14','1m'),(14,3,44,3,'123123','123123',123123.00,'new','123123','waiting_approval',0,'2026-01-02 10:28:33','2026-01-02 10:28:33','3m'),(15,3,48,16,'321312','123123321',123123.00,'new','123123','waiting_approval',0,'2026-01-02 10:32:56','2026-01-02 10:32:56','1m'),(16,3,49,16,'12312312','123123213',123132.00,'used','123123123','waiting_approval',0,'2026-01-02 16:51:08','2026-01-02 16:51:08','1m'),(17,3,44,3,'13123','123123',123123.00,'used','132123123','waiting_approval',0,'2026-01-02 17:08:38','2026-01-02 17:08:38','6m'),(18,3,51,3,'123123123','213123123',123123123.00,'new','123123123','waiting_approval',0,'2026-01-02 18:08:04','2026-01-02 18:08:04','3m'),(19,3,51,3,'123123','123123',123123.00,'used','2131231','waiting_approval',0,'2026-01-02 18:36:06','2026-01-02 18:36:06','3m'),(20,3,52,3,'Laptop giá rẻ','Laptop giá rẻ, chơi được genshin impact',5000000.00,'used','Quận Tân Phú TP Hồ Chí Minh','waiting_approval',0,'2026-01-04 00:08:01','2026-01-04 00:08:01','no'),(21,4,52,3,'Laptop giá rẻ','Bán như cho',99999999.00,'used','120 Yên Lãng','waiting_approval',0,'2026-01-04 14:15:34','2026-01-04 14:15:34','12m');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `products`
--

DROP TABLE IF EXISTS `products`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `products` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `category_id` int DEFAULT NULL,
  `brand_id` int DEFAULT NULL,
  `model_id` int NOT NULL,
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_products_category` (`category_id`) USING BTREE,
  KEY `fk_products_brand` (`brand_id`),
  KEY `fk_products_model` (`model_id`),
  CONSTRAINT `fk_products_brand` FOREIGN KEY (`brand_id`) REFERENCES `brands` (`id`),
  CONSTRAINT `fk_products_category` FOREIGN KEY (`category_id`) REFERENCES `categories` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_products_model` FOREIGN KEY (`model_id`) REFERENCES `models` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=53 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (42,20,NULL,15,'2026-01-01 19:01:04','2026-01-01 19:01:04'),(43,2,1,1,'2026-01-01 19:16:03','2026-01-01 19:16:03'),(44,3,4,6,'2026-01-02 05:09:19','2026-01-02 05:09:19'),(45,2,2,3,'2026-01-02 09:14:03','2026-01-02 09:14:03'),(46,16,10,12,'2026-01-02 09:25:32','2026-01-02 09:25:32'),(47,5,8,10,'2026-01-02 09:38:14','2026-01-02 09:38:14'),(48,16,NULL,12,'2026-01-02 10:32:56','2026-01-02 10:32:56'),(49,16,10,13,'2026-01-02 16:51:08','2026-01-02 16:51:08'),(51,3,4,5,'2026-01-02 18:08:04','2026-01-02 18:08:04'),(52,3,6,8,'2026-01-04 00:08:01','2026-01-04 00:08:01');
/*!40000 ALTER TABLE `products` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `report_reasons`
--

DROP TABLE IF EXISTS `report_reasons`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `report_reasons` (
  `id` int NOT NULL AUTO_INCREMENT,
  `code` varchar(80) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `title` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL,
  `scope` enum('post','message','both') CHARACTER SET utf8mb4 COLLATE utf8mb4_general_ci NOT NULL DEFAULT 'post',
  `is_active` tinyint(1) NOT NULL DEFAULT '1',
  `sort_order` int DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `code` (`code`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `report_reasons`
--

LOCK TABLES `report_reasons` WRITE;
/*!40000 ALTER TABLE `report_reasons` DISABLE KEYS */;
INSERT INTO `report_reasons` VALUES (1,'spam','Nội dung spam hoặc quảng cáo','both',1,1,'2025-12-31 09:18:51','2025-12-31 09:18:51'),(2,'offensive','Ngôn từ xúc phạm hoặc thù ghét','both',1,2,'2025-12-31 09:18:51','2025-12-31 09:18:51'),(3,'scam','Lừa đảo hoặc gây hiểu lầm','post',1,3,'2025-12-31 09:18:51','2025-12-31 09:18:51'),(4,'harassment','Quấy rối hoặc làm phiền','message',1,4,'2025-12-31 09:18:51','2025-12-31 09:18:51'),(5,'inappropriate','Nội dung không phù hợp','both',1,5,'2025-12-31 09:18:51','2025-12-31 09:18:51'),(6,'duplicate','Bài đăng trùng lặp','post',1,6,'2025-12-31 09:18:51','2025-12-31 09:18:51'),(7,'fake_info','Thông tin sai sự thật','post',1,7,'2025-12-31 09:18:51','2025-12-31 09:18:51'),(8,'impersonation','Giả mạo người khác','both',1,8,'2025-12-31 09:18:51','2025-12-31 09:18:51'),(9,'other','Lý do khác','both',1,99,'2025-12-31 09:18:51','2025-12-31 09:18:51');
/*!40000 ALTER TABLE `report_reasons` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `scheduled_boosts`
--

DROP TABLE IF EXISTS `scheduled_boosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `scheduled_boosts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_boost_id` bigint NOT NULL,
  `scheduled_at` datetime NOT NULL,
  `created_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`),
  KEY `post_boost_id` (`post_boost_id`),
  CONSTRAINT `scheduled_boosts_ibfk_1` FOREIGN KEY (`post_boost_id`) REFERENCES `post_boosts` (`id`) ON DELETE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `scheduled_boosts`
--

LOCK TABLES `scheduled_boosts` WRITE;
/*!40000 ALTER TABLE `scheduled_boosts` DISABLE KEYS */;
INSERT INTO `scheduled_boosts` VALUES (1,1,'2026-01-02 08:00:00','2026-01-02 18:08:04','2026-01-02 18:08:04'),(2,1,'2026-01-02 09:00:00','2026-01-02 18:08:04','2026-01-02 18:08:04'),(3,2,'2026-01-02 08:00:00','2026-01-02 18:36:06','2026-01-02 18:36:06'),(4,2,'2026-01-02 20:00:00','2026-01-02 18:36:06','2026-01-02 18:36:06'),(5,2,'2026-01-03 08:00:00','2026-01-02 18:36:06','2026-01-02 18:36:06'),(6,2,'2026-01-03 20:00:00','2026-01-02 18:36:06','2026-01-02 18:36:06'),(7,2,'2026-01-04 08:00:00','2026-01-02 18:36:06','2026-01-02 18:36:06'),(8,2,'2026-01-04 20:00:00','2026-01-02 18:36:06','2026-01-02 18:36:06');
/*!40000 ALTER TABLE `scheduled_boosts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `users`
--

DROP TABLE IF EXISTS `users`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `users` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `name` varchar(150) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `email` varchar(255) COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `password` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `phone` varchar(20) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `role` enum('user','admin') COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'user',
  `status` enum('active','inactive','banned') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'active',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `wallet_balance` decimal(13,2) NOT NULL DEFAULT '0.00' COMMENT 'Số dư WellCoin',
  `avatar_file_id` bigint DEFAULT NULL,
  PRIMARY KEY (`id`) USING BTREE,
  UNIQUE KEY `email` (`email`) USING BTREE,
  UNIQUE KEY `unique_avatar_file_id` (`avatar_file_id`) USING BTREE,
  CONSTRAINT `fk_users_avatar_file` FOREIGN KEY (`avatar_file_id`) REFERENCES `files` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `users`
--

LOCK TABLES `users` WRITE;
/*!40000 ALTER TABLE `users` DISABLE KEYS */;
INSERT INTO `users` VALUES (3,'Test User','test@example.com','$2y$12$IWwjuxAEV2eVVPExlaYpZODVRNoiHEuV2RUFUreiHgy4pIFnUyICO','0987654321','user','active','2025-11-18 09:54:00','2026-01-03 20:59:10',0.00,95),(4,'Super Admin','admin@example.com','$2y$12$AYkGLijaw0qMry8NytGD1utRyiivbAWXLyu7vIx6eJKYHHkaoiej.','0123456789','admin','active','2025-11-22 13:32:49','2025-11-27 01:56:14',0.00,NULL),(5,'Mè Thái Huy','','$2y$12$.K6Lv/87zM2TjjvOlYeo8O9PD3xY3kTVdjcp31QMW2qvT95ZSKvqm','0772895118','user','active','2025-11-26 21:10:48','2025-11-26 21:19:11',0.00,NULL),(6,'anthonyyyyy',NULL,'$2y$12$aQLLSBPGH2poqNb551eka.liQWkAHvSZUQWYFp9Zh1ClCvTbWEpFG','0234567890','user','active','2025-11-27 00:38:08','2025-11-27 00:38:08',0.00,NULL),(7,'Nguyen Van A','test@gmail.com','$2y$12$lqlG.lh2PYrV32WOZ70CwuygRfjjvjCgpXyF3jiN1fvPZKo9A8O76','0787654322','user','active','2025-11-27 00:50:57','2025-11-27 00:50:57',0.00,NULL);
/*!40000 ALTER TABLE `users` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet_anchors`
--

DROP TABLE IF EXISTS `wallet_anchors`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_anchors` (
  `id` int NOT NULL AUTO_INCREMENT,
  `merkle_root` varchar(66) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `tx_hash` varchar(66) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `block_number` int NOT NULL,
  `total_transactions` int DEFAULT '0',
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  `note` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci,
  PRIMARY KEY (`id`) USING BTREE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet_anchors`
--

LOCK TABLES `wallet_anchors` WRITE;
/*!40000 ALTER TABLE `wallet_anchors` DISABLE KEYS */;
/*!40000 ALTER TABLE `wallet_anchors` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `wallet_transactions`
--

DROP TABLE IF EXISTS `wallet_transactions`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `wallet_transactions` (
  `id` int NOT NULL AUTO_INCREMENT,
  `user_id` bigint NOT NULL,
  `amount` decimal(18,2) NOT NULL,
  `type` enum('earn','spend') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `description` varchar(255) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference_table` varchar(50) CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT NULL,
  `reference_id` int DEFAULT NULL,
  `anchored` tinyint(1) DEFAULT '0',
  `anchor_id` int DEFAULT NULL,
  `created_at` datetime DEFAULT CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `user_id` (`user_id`) USING BTREE,
  KEY `anchor_id` (`anchor_id`) USING BTREE,
  CONSTRAINT `wallet_transactions_ibfk_1` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `wallet_transactions_ibfk_2` FOREIGN KEY (`anchor_id`) REFERENCES `wallet_anchors` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `wallet_transactions`
--

LOCK TABLES `wallet_transactions` WRITE;
/*!40000 ALTER TABLE `wallet_transactions` DISABLE KEYS */;
/*!40000 ALTER TABLE `wallet_transactions` ENABLE KEYS */;
UNLOCK TABLES;
/*!40103 SET TIME_ZONE=@OLD_TIME_ZONE */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;

-- Dump completed on 2026-01-05  1:37:48
