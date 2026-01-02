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
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `attribute_options`
--

LOCK TABLES `attribute_options` WRITE;
/*!40000 ALTER TABLE `attribute_options` DISABLE KEYS */;
INSERT INTO `attribute_options` VALUES (43,1,'Intel Core i3'),(44,1,'Intel Core i5'),(45,1,'Intel Core i7'),(46,1,'Intel Core i9'),(47,1,'AMD Ryzen 3'),(48,1,'AMD Ryzen 5'),(49,1,'AMD Ryzen 7'),(50,1,'Apple M1'),(51,1,'Apple M2'),(52,2,'4GB'),(53,2,'8GB'),(54,2,'16GB'),(55,2,'32GB'),(56,3,'128GB SSD'),(57,3,'256GB SSD'),(58,3,'512GB SSD'),(59,3,'1TB HDD'),(60,3,'1TB SSD'),(61,4,'13 inch'),(62,4,'14 inch'),(63,4,'15.6 inch'),(64,4,'17 inch'),(65,6,'12MP'),(66,6,'48MP'),(67,6,'64MP'),(68,6,'108MP'),(69,7,'Windows'),(70,7,'macOS'),(71,7,'Linux'),(72,7,'Android'),(73,7,'iOS'),(74,8,'Đen'),(75,8,'Trắng'),(76,8,'Xanh'),(77,8,'Đỏ'),(78,8,'Bạc'),(79,9,'800W'),(80,9,'1000W'),(81,9,'1200W'),(82,9,'1500W'),(83,10,'2L'),(84,10,'3L'),(85,10,'5L'),(86,10,'10L');
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
INSERT INTO `boost_package_categories` VALUES (1,'Đăng tin','Gói mặc định khi đăng tin, không có ưu tiên hiển thị. Người dùng vẫn có thể đăng bài miễn phí hoặc trả phí cơ bản khi vượt quá số lượng cho phép.'),(2,'Đẩy tin','Các gói giúp bài đăng được hiển thị nổi bật hơn: đẩy ngay, đẩy theo giờ hẹn, hoặc ưu tiên top kết quả tìm kiếm.'),(3,'Nâng cấp giao diện','Các gói làm bài đăng nổi bật về hình thức: hiển thị lớn hơn, kèm nhiều ảnh/video.');
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
INSERT INTO `boost_packages` VALUES (1,'Gói mặc định (không boost)',1,0.00,0,'Đăng tin cơ bản. Miễn phí cho 2 bài đầu tiên. Từ bài thứ 3 trở đi sẽ có phí tối thiểu 6,000 và cộng thêm phí nếu đăng kèm nhiều ảnh hoặc video.','2025-12-31 10:11:06','2025-12-31 10:11:06'),(2,'Đẩy tin thường',2,15000.00,1,'Đẩy tin ngay sau khi thanh toán. Bài đăng sẽ được ưu tiên hiển thị trong vòng 1 giờ để tiếp cận nhiều người hơn.','2025-12-31 10:11:06','2025-12-31 10:11:06'),(3,'Đẩy tin hẹn giờ',2,15000.00,1,'Người dùng chọn khung giờ và số lần đẩy. Tối thiểu 8 lần, nếu chọn nhiều hơn, giá sẽ tăng theo số lần. Giúp bài đăng xuất hiện đều đặn theo lịch mong muốn.','2025-12-31 10:11:06','2025-12-31 10:25:39'),(4,'Đẩy tin ưu tiên',2,50000.00,3,'Trong 7 ngày, bài đăng luôn nằm trong top 5 kết quả tìm kiếm liên quan, kể cả khi người dùng chuyển sang trang kế tiếp. Phù hợp cho tin quan trọng, cần nhiều lượt xem.','2025-12-31 10:11:06','2025-12-31 10:11:06'),(5,'Nâng cấp giao diện',3,20000.00,0,'Bài đăng hiển thị nổi bật hơn: kích thước gấp đôi, hiển thị thêm nhiều ảnh trong nội dung. Hiệu lực 7 ngày.','2025-12-31 10:11:06','2025-12-31 10:11:06');
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
  KEY `fk_category_images_category` (`category_id`),
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
INSERT INTO `events` VALUES (1,'Hội chợ cuối năm','Sự kiện giảm giá lớn','daily',1000.00,NULL,'2025-12-01 00:00:00','2025-12-10 00:00:00','active','2025-11-27 00:45:21');
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
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `files`
--

LOCK TABLES `files` WRITE;
/*!40000 ALTER TABLE `files` DISABLE KEYS */;
INSERT INTO `files` VALUES (47,'cloudinary','k9fmryrlnkney0kuiklm','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767294063/k9fmryrlnkney0kuiklm.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"6a2b4d9b5abb1d57c761dfdf096c1ec8\",\"public_id\":\"k9fmryrlnkney0kuiklm\",\"version\":1767294063,\"version_id\":\"76e4d7a730ffc1d9d41d7f41f42ec322\",\"signature\":\"f459232ec578ced87a7d4219c24b15e71744a836\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-01T19:01:03Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294063\\/k9fmryrlnkney0kuiklm.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294063\\/k9fmryrlnkney0kuiklm.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-01 19:01:04','2026-01-01 19:01:04'),(48,'cloudinary','rgog0cs31xe49rtytm9u','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767294945/rgog0cs31xe49rtytm9u.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"8c80a2e05a9c7721a0009ddd65fe3620\",\"public_id\":\"rgog0cs31xe49rtytm9u\",\"version\":1767294945,\"version_id\":\"b35a67372d02cd778633b36e12080c8c\",\"signature\":\"024129bc3c76c5236f8ec7286f9d69113759329c\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-01T19:15:45Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294945\\/rgog0cs31xe49rtytm9u.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294945\\/rgog0cs31xe49rtytm9u.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-01 19:15:46','2026-01-01 19:15:46'),(49,'cloudinary','gbjtnbbmfzb7kabv4tgl','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767294950/gbjtnbbmfzb7kabv4tgl.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"6fd930bdc46613687097d50bb191eb03\",\"public_id\":\"gbjtnbbmfzb7kabv4tgl\",\"version\":1767294950,\"version_id\":\"6066b186089a2e8da532f9a12215ed40\",\"signature\":\"1353db36b1efdee33c7a4ea7c68899ce4da230c4\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-01T19:15:50Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294950\\/gbjtnbbmfzb7kabv4tgl.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294950\\/gbjtnbbmfzb7kabv4tgl.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-01 19:15:52','2026-01-01 19:15:52'),(50,'cloudinary','kl7xkvhog4tm4wi3mywu','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767294956/kl7xkvhog4tm4wi3mywu.jpg',NULL,'z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa','image/jpeg',1213552,1920,2560,'image',3,1,'{\"asset_id\":\"f1cd4c42e7e14b3558fe8110c3c92ee9\",\"public_id\":\"kl7xkvhog4tm4wi3mywu\",\"version\":1767294956,\"version_id\":\"51b5ac83092c1ff47259ff72243bbd7d\",\"signature\":\"f89ade81f00fa2bfbcc87386f29f0017c0d32b99\",\"width\":1920,\"height\":2560,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-01T19:15:56Z\",\"tags\":[],\"bytes\":1213552,\"type\":\"upload\",\"etag\":\"b05aa77038a09e2bd1500de1baecab1e\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294956\\/kl7xkvhog4tm4wi3mywu.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767294956\\/kl7xkvhog4tm4wi3mywu.jpg\",\"asset_folder\":null,\"display_name\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\",\"original_filename\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\"}','2026-01-01 19:15:56','2026-01-01 19:15:56'),(51,'cloudinary','mc2izuozfh47tr4mbafn','https://res.cloudinary.com/dj7ljwprv/video/upload/v1767294961/mc2izuozfh47tr4mbafn.mp4',NULL,'2025-12-31 19-14-17','video/mp4',1448697,1920,1080,'video',3,1,'{\"asset_id\":\"bba1c25893fe9b5a426453294c6a56aa\",\"public_id\":\"mc2izuozfh47tr4mbafn\",\"version\":1767294961,\"version_id\":\"ca79351d0330e1b7aec9da8c400f0782\",\"signature\":\"cb4c712a401733a7264345b6385096a079ee9035\",\"width\":1920,\"height\":1080,\"format\":\"mp4\",\"resource_type\":\"video\",\"created_at\":\"2026-01-01T19:16:01Z\",\"tags\":[],\"pages\":0,\"bytes\":1448697,\"type\":\"upload\",\"etag\":\"74bacd519acd497538ab2b2e8165e8a6\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767294961\\/mc2izuozfh47tr4mbafn.mp4\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/v1767294961\\/mc2izuozfh47tr4mbafn.mp4\",\"playback_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/video\\/upload\\/sp_auto\\/v1767294961\\/mc2izuozfh47tr4mbafn.m3u8\",\"asset_folder\":null,\"display_name\":\"2025-12-31 19-14-17\",\"audio\":{\"codec\":\"aac\",\"bit_rate\":\"81901\",\"frequency\":48000,\"channels\":2,\"channel_layout\":\"stereo\"},\"video\":{\"pix_format\":\"yuv420p\",\"codec\":\"h264\",\"level\":42,\"profile\":\"High\",\"bit_rate\":\"6003073\",\"dar\":\"16:9\",\"time_base\":\"1\\/15360\"},\"is_audio\":false,\"frame_rate\":60,\"bit_rate\":6099776,\"duration\":1.9,\"rotation\":0,\"original_filename\":\"2025-12-31 19-14-17\",\"nb_frames\":114}','2026-01-01 19:16:03','2026-01-01 19:16:03'),(75,'cloudinary','omo719wkquinc9bzp2gr','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767329385/omo719wkquinc9bzp2gr.jpg',NULL,'beDauHacker','image/jpeg',126908,590,1280,'image',3,1,'{\"asset_id\":\"36c6117bb7e2b319c679ecc2fb9e0993\",\"public_id\":\"omo719wkquinc9bzp2gr\",\"version\":1767329385,\"version_id\":\"d07d2ab8e5bd0cb50cf3ed701307fdb1\",\"signature\":\"6064ae17964d2206e03e3b04af8d69eb05201edd\",\"width\":590,\"height\":1280,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T04:49:45Z\",\"tags\":[],\"bytes\":126908,\"type\":\"upload\",\"etag\":\"9aac87317f46fcf12a4951d36f742efa\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767329385\\/omo719wkquinc9bzp2gr.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767329385\\/omo719wkquinc9bzp2gr.jpg\",\"asset_folder\":null,\"display_name\":\"beDauHacker\",\"original_filename\":\"beDauHacker\"}','2026-01-02 04:49:45','2026-01-02 04:49:45'),(76,'cloudinary','npkolyjgzmxdyywocjgv','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767330478/npkolyjgzmxdyywocjgv.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"da8557a33e4f4881d819009363909f7b\",\"public_id\":\"npkolyjgzmxdyywocjgv\",\"version\":1767330478,\"version_id\":\"f0a350f6140af745140da46c0bea356e\",\"signature\":\"1e9519347af9e227ebdbddc5580be77ddd480fde\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T05:07:58Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330478\\/npkolyjgzmxdyywocjgv.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330478\\/npkolyjgzmxdyywocjgv.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-02 05:07:59','2026-01-02 05:07:59'),(77,'cloudinary','wxp1vftjnuhfribxyqvg','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767330481/wxp1vftjnuhfribxyqvg.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"20ac090540b552dec10140dfdea5ae7a\",\"public_id\":\"wxp1vftjnuhfribxyqvg\",\"version\":1767330481,\"version_id\":\"c7d0ad999db03c08867e6a7377ee09f9\",\"signature\":\"cfa7e08fe5bd5e553c35101e1730b9bf5f25596b\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T05:08:01Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330481\\/wxp1vftjnuhfribxyqvg.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330481\\/wxp1vftjnuhfribxyqvg.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-02 05:08:02','2026-01-02 05:08:02'),(78,'cloudinary','hczn3qj6wsu4ziln4t1y','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767330485/hczn3qj6wsu4ziln4t1y.jpg',NULL,'z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa','image/jpeg',1213552,1920,2560,'image',3,1,'{\"asset_id\":\"23080e4ce690e6460ad6b53e78a5f01f\",\"public_id\":\"hczn3qj6wsu4ziln4t1y\",\"version\":1767330485,\"version_id\":\"b2fdd7a2016391b1ff304bdad4b936be\",\"signature\":\"863ff5a5e71b09474730acacf3c16e50ff21700c\",\"width\":1920,\"height\":2560,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T05:08:05Z\",\"tags\":[],\"bytes\":1213552,\"type\":\"upload\",\"etag\":\"b05aa77038a09e2bd1500de1baecab1e\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330485\\/hczn3qj6wsu4ziln4t1y.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330485\\/hczn3qj6wsu4ziln4t1y.jpg\",\"asset_folder\":null,\"display_name\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\",\"original_filename\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\"}','2026-01-02 05:08:06','2026-01-02 05:08:06'),(79,'cloudinary','uaxnrlillojttud3heur','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767330551/uaxnrlillojttud3heur.png',NULL,'ScreenShot','image/png',92604,1440,1850,'image',3,1,'{\"asset_id\":\"918ab5729c140517b600d5f374f9fd8b\",\"public_id\":\"uaxnrlillojttud3heur\",\"version\":1767330551,\"version_id\":\"dfd367a8633013ee8a4e999dbb206ac7\",\"signature\":\"84652d2689acbf6e712d45e4098e9f976eec3fa0\",\"width\":1440,\"height\":1850,\"format\":\"png\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T05:09:11Z\",\"tags\":[],\"bytes\":92604,\"type\":\"upload\",\"etag\":\"dda4fb17dfc7b0740aaa851845cf0943\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330551\\/uaxnrlillojttud3heur.png\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330551\\/uaxnrlillojttud3heur.png\",\"asset_folder\":null,\"display_name\":\"ScreenShot\",\"original_filename\":\"ScreenShot\"}','2026-01-02 05:09:12','2026-01-02 05:09:12'),(80,'cloudinary','zsnxvu4xrb46i95zzbgc','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767330553/zsnxvu4xrb46i95zzbgc.jpg',NULL,'sontung','image/jpeg',466785,1024,1452,'image',3,1,'{\"asset_id\":\"6ec30f5d7d7a5bc8f0063b8ec500b256\",\"public_id\":\"zsnxvu4xrb46i95zzbgc\",\"version\":1767330553,\"version_id\":\"6873e4d4788f479553b7bc2bc1e2a1bb\",\"signature\":\"8c84159f963cbc9003584a768b2422668ff37715\",\"width\":1024,\"height\":1452,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T05:09:13Z\",\"tags\":[],\"bytes\":466785,\"type\":\"upload\",\"etag\":\"ed2155488dc5a64d363529bcfb1ddc77\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330553\\/zsnxvu4xrb46i95zzbgc.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330553\\/zsnxvu4xrb46i95zzbgc.jpg\",\"asset_folder\":null,\"display_name\":\"sontung\",\"original_filename\":\"sontung\"}','2026-01-02 05:09:14','2026-01-02 05:09:14'),(81,'cloudinary','llgoaugwylshl3kzhqcz','https://res.cloudinary.com/dj7ljwprv/image/upload/v1767330558/llgoaugwylshl3kzhqcz.jpg',NULL,'z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa','image/jpeg',1213552,1920,2560,'image',3,1,'{\"asset_id\":\"ced8f2f7aa886d4a0f67732f16d7c47d\",\"public_id\":\"llgoaugwylshl3kzhqcz\",\"version\":1767330558,\"version_id\":\"d277e460d999cec404e89e1bda780b1f\",\"signature\":\"d52cc44ccef4e9636eed9c8a5621de89963cc199\",\"width\":1920,\"height\":2560,\"format\":\"jpg\",\"resource_type\":\"image\",\"created_at\":\"2026-01-02T05:09:18Z\",\"tags\":[],\"bytes\":1213552,\"type\":\"upload\",\"etag\":\"b05aa77038a09e2bd1500de1baecab1e\",\"placeholder\":false,\"url\":\"http:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330558\\/llgoaugwylshl3kzhqcz.jpg\",\"secure_url\":\"https:\\/\\/res.cloudinary.com\\/dj7ljwprv\\/image\\/upload\\/v1767330558\\/llgoaugwylshl3kzhqcz.jpg\",\"asset_folder\":null,\"display_name\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\",\"original_filename\":\"z7311518243702_0a643ceb7a4f29f805ba94cb2f61e7fa\"}','2026-01-02 05:09:18','2026-01-02 05:09:18');
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
  CONSTRAINT `fk_interactions_reason` FOREIGN KEY (`reason_id`) REFERENCES `report_reasons` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_interactions_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `interactions`
--

LOCK TABLES `interactions` WRITE;
/*!40000 ALTER TABLE `interactions` DISABLE KEYS */;
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
  `sender_id` bigint NOT NULL,
  `receiver_id` bigint NOT NULL,
  `content` text CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL,
  `is_read` tinyint(1) DEFAULT '0',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `transaction_count` int NOT NULL DEFAULT '0' COMMENT 'Số lần giao dịch đã xác nhận giữa 2 người trong cuộc hội thoại',
  `status` enum('sending','sent','failed','deleted') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'sent',
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_messages_sender` (`sender_id`) USING BTREE,
  KEY `fk_messages_receiver` (`receiver_id`) USING BTREE,
  CONSTRAINT `fk_messages_receiver` FOREIGN KEY (`receiver_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT,
  CONSTRAINT `fk_messages_sender` FOREIGN KEY (`sender_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `messages`
--

LOCK TABLES `messages` WRITE;
/*!40000 ALTER TABLE `messages` DISABLE KEYS */;
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
  CONSTRAINT `fk_payments_user` FOREIGN KEY (`user_id`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `payments`
--

LOCK TABLES `payments` WRITE;
/*!40000 ALTER TABLE `payments` DISABLE KEYS */;
/*!40000 ALTER TABLE `payments` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `post_boosts`
--

DROP TABLE IF EXISTS `post_boosts`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `post_boosts` (
  `id` bigint NOT NULL AUTO_INCREMENT,
  `post_id` bigint NOT NULL,
  `boost_package_id` int NOT NULL,
  `quantity` int DEFAULT '1',
  `payment_id` bigint DEFAULT NULL,
  `start_at` datetime DEFAULT NULL,
  `end_at` datetime DEFAULT NULL,
  `status` enum('pending','active','expired','canceled') CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci DEFAULT 'pending',
  `created_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `updated_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`id`) USING BTREE,
  KEY `fk_post_boosts_post` (`post_id`) USING BTREE,
  KEY `fk_post_boosts_package` (`boost_package_id`) USING BTREE,
  KEY `fk_post_boosts_payment` (`payment_id`) USING BTREE,
  CONSTRAINT `fk_post_boosts_package` FOREIGN KEY (`boost_package_id`) REFERENCES `boost_packages` (`id`) ON DELETE RESTRICT ON UPDATE RESTRICT,
  CONSTRAINT `fk_post_boosts_payment` FOREIGN KEY (`payment_id`) REFERENCES `payments` (`id`) ON DELETE SET NULL ON UPDATE RESTRICT,
  CONSTRAINT `fk_post_boosts_post` FOREIGN KEY (`post_id`) REFERENCES `posts` (`id`) ON DELETE CASCADE ON UPDATE RESTRICT
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_boosts`
--

LOCK TABLES `post_boosts` WRITE;
/*!40000 ALTER TABLE `post_boosts` DISABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=12 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `post_medias`
--

LOCK TABLES `post_medias` WRITE;
/*!40000 ALTER TABLE `post_medias` DISABLE KEYS */;
INSERT INTO `post_medias` VALUES (1,4,0,1,'2026-01-01 19:01:04',47,'2026-01-01 19:01:04'),(2,5,0,1,'2026-01-01 19:16:03',48,'2026-01-01 19:16:03'),(3,5,1,0,'2026-01-01 19:16:03',49,'2026-01-01 19:16:03'),(4,5,2,0,'2026-01-01 19:16:03',50,'2026-01-01 19:16:03'),(5,5,0,0,'2026-01-01 19:16:03',51,'2026-01-01 19:16:03'),(6,6,0,1,'2026-01-02 05:08:06',76,'2026-01-02 05:08:06'),(7,6,1,0,'2026-01-02 05:08:06',77,'2026-01-02 05:08:06'),(8,6,2,0,'2026-01-02 05:08:06',78,'2026-01-02 05:08:06'),(9,7,0,1,'2026-01-02 05:09:19',79,'2026-01-02 05:09:19'),(10,7,1,0,'2026-01-02 05:09:19',80,'2026-01-02 05:09:19'),(11,7,2,0,'2026-01-02 05:09:19',81,'2026-01-02 05:09:19');
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
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `posts`
--

LOCK TABLES `posts` WRITE;
/*!40000 ALTER TABLE `posts` DISABLE KEYS */;
INSERT INTO `posts` VALUES (4,3,42,20,'sd','sdsd',123123.00,'new','132123','waiting_approval',0,'2026-01-01 19:01:04','2026-01-01 19:01:04','no'),(5,3,43,2,'123123','123123',123123.00,'new','21313','waiting_approval',0,'2026-01-01 19:16:03','2026-01-01 19:16:03','1m'),(6,3,42,20,'213','123',123.00,'new','123123','waiting_approval',0,'2026-01-02 05:08:06','2026-01-02 05:08:06','6m'),(7,3,44,3,'213123','123123',123123.00,'new','123213','waiting_approval',0,'2026-01-02 05:09:19','2026-01-02 05:09:19','6m');
/*!40000 ALTER TABLE `posts` ENABLE KEYS */;
UNLOCK TABLES;

--
-- Table structure for table `product_attributes`
--

DROP TABLE IF EXISTS `product_attributes`;
/*!40101 SET @saved_cs_client     = @@character_set_client */;
/*!50503 SET character_set_client = utf8mb4 */;
CREATE TABLE `product_attributes` (
  `id` int NOT NULL AUTO_INCREMENT,
  `product_id` bigint NOT NULL,
  `attribute_id` int NOT NULL,
  `value` varchar(255) NOT NULL,
  PRIMARY KEY (`id`),
  KEY `fk_product_attributes_product` (`product_id`),
  KEY `fk_product_attributes_attribute` (`attribute_id`),
  CONSTRAINT `fk_product_attributes_attribute` FOREIGN KEY (`attribute_id`) REFERENCES `attributes` (`id`),
  CONSTRAINT `fk_product_attributes_product` FOREIGN KEY (`product_id`) REFERENCES `products` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=246 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `product_attributes`
--

LOCK TABLES `product_attributes` WRITE;
/*!40000 ALTER TABLE `product_attributes` DISABLE KEYS */;
/*!40000 ALTER TABLE `product_attributes` ENABLE KEYS */;
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
) ENGINE=InnoDB AUTO_INCREMENT=45 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci ROW_FORMAT=DYNAMIC;
/*!40101 SET character_set_client = @saved_cs_client */;

--
-- Dumping data for table `products`
--

LOCK TABLES `products` WRITE;
/*!40000 ALTER TABLE `products` DISABLE KEYS */;
INSERT INTO `products` VALUES (42,20,NULL,15,'2026-01-01 19:01:04','2026-01-01 19:01:04'),(43,2,1,1,'2026-01-01 19:16:03','2026-01-01 19:16:03'),(44,3,4,6,'2026-01-02 05:09:19','2026-01-02 05:09:19');
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
INSERT INTO `users` VALUES (3,'Test User','test@example.com','$2y$12$IWwjuxAEV2eVVPExlaYpZODVRNoiHEuV2RUFUreiHgy4pIFnUyICO','0987654321','user','active','2025-11-18 09:54:00','2026-01-02 06:33:04',6000.00,75),(4,'Super Admin','admin@example.com','$2y$12$AYkGLijaw0qMry8NytGD1utRyiivbAWXLyu7vIx6eJKYHHkaoiej.','0123456789','admin','active','2025-11-22 13:32:49','2025-11-27 01:56:14',0.00,NULL),(5,'Mè Thái Huy','','$2y$12$.K6Lv/87zM2TjjvOlYeo8O9PD3xY3kTVdjcp31QMW2qvT95ZSKvqm','0772895118','user','active','2025-11-26 21:10:48','2025-11-26 21:19:11',0.00,NULL),(6,'anthonyyyyy',NULL,'$2y$12$aQLLSBPGH2poqNb551eka.liQWkAHvSZUQWYFp9Zh1ClCvTbWEpFG','0234567890','user','active','2025-11-27 00:38:08','2025-11-27 00:38:08',0.00,NULL),(7,'Nguyen Van A','test@gmail.com','$2y$12$lqlG.lh2PYrV32WOZ70CwuygRfjjvjCgpXyF3jiN1fvPZKo9A8O76','0787654322','user','active','2025-11-27 00:50:57','2025-11-27 00:50:57',0.00,NULL);
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

-- Dump completed on 2026-01-02 15:04:05
