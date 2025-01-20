CREATE TABLE `user` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `name` VARCHAR(50) NOT NULL,
    `deleted_at` TIMESTAMP DEFAULT NULL
);

CREATE TABLE `approval_request` (
    `id` INT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
    `requester_id` INT UNSIGNED NOT NULL,
    `title` VARCHAR(100) NOT NULL,
    `description` TEXT NOT NULL,
    `status` ENUM ('draft', 'proceeding', 'approved', 'rejected') NOT NULL DEFAULT 'draft',
    `current_step` TINYINT UNSIGNED NOT NULL DEFAULT 1,
    `requested_at` TIMESTAMP NULL DEFAULT NULL,
    `updated_at` TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    `deleted_at` TIMESTAMP DEFAULT NULL
);

CREATE TABLE `approval_step` (
     `id` BIGINT UNSIGNED PRIMARY KEY AUTO_INCREMENT,
     `approval_request_id` INT UNSIGNED NOT NULL,
     `approver_id` INT UNSIGNED NOT NULL,
     `step` TINYINT UNSIGNED NOT NULL,
     `type` ENUM ('approval', 'agreement') NOT NULL,
     `status` ENUM ('pending', 'proceeding', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
     `comment` VARCHAR(1000) DEFAULT NULL,
     `completed_at` TIMESTAMP NULL DEFAULT NULL
);

ALTER TABLE `approval_request` ADD FOREIGN KEY (`requester_id`) REFERENCES `user` (`id`);

ALTER TABLE `approval_step` ADD FOREIGN KEY (`approval_request_id`) REFERENCES `approval_request` (`id`) ON DELETE CASCADE;

ALTER TABLE `approval_step` ADD FOREIGN KEY (`approver_id`) REFERENCES `user` (`id`);
