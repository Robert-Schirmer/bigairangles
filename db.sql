DROP TABLE IF EXISTS `image_properties`;
DROP TABLE IF EXISTS `images`;

CREATE TABLE `images` ( `image_id` int NOT NULL AUTO_INCREMENT ,
`src` varchar(255) NOT NULL ,
`posted` datetime NOT NULL ,
`likes` int NOT NULL DEFAULT 0 ,
`mainimage` tinyint NOT NULL DEFAULT 0 ,
PRIMARY KEY (`image_id`) )ENGINE = InnoDB;

CREATE TABLE `image_properties` ( `prop_id` int NOT NULL AUTO_INCREMENT ,
`image_id` int NOT NULL ,
`label` varchar(255) NOT NULL ,
`value` varchar(255) NOT NULL ,
PRIMARY KEY (`prop_id`),
KEY `FK_16` (`image_id`),
CONSTRAINT `FK_image_id` FOREIGN KEY `FK_16` (`image_id`) REFERENCES `images` (`image_id`) ON
DELETE
	CASCADE ON
	UPDATE
		CASCADE )ENGINE = InnoDB;
