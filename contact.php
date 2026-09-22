<?php
session_start();
require_once 'includes/db.php';
require_once 'includes/functions.php';

$feedback = '';
$feedbackType = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $name    = sanitize($_POST['name'] ?? '');
    $email   = sanitize($_POST['email'] ?? '');
    $message = sanitize($_POST['message'] ?? '');

    if (!empty($name) && !empty($email) && !empty($message)) {
        $stmt = $pdo->prepare("INSERT INTO messages (name, email, message) VALUES (?, ?, ?)");
        if ($stmt->execute([$name, $email, $message])) {
            $feedback = "Thank you! Your message has been sent successfully.";
            $feedbackType = "success";
        } else {
            $feedback = "Database error! Could not send message.";
            $feedbackType = "danger";
        }
    } else {
        $feedback = "Please fill in all fields.";
        $feedbackType = "danger";
    }
}
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Contact Us - Yummy.lk</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-lg-6">
            <h2 class="mb-4 text-center">Get in Touch</h2>
            <?php if ($feedback): ?>
                <div class="alert alert-<?= $feedbackType ?>"><?= $feedback ?></div>
            <?php endif; ?>
            <form method="POST" action="contact.php" class="p-4 border rounded shadow-sm bg-white">
                <div class="mb-3">
                    <label class="form-label fw-semibold">Your Name</label>
                    <input type="text" name="name" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-semibold">Your Email</label>
                    <input type="email" name="email" class="form-control" required>
                </div>
                <div class="mb-3">
                    <label class="form-label fw-semibold">Your Message</label>
                    <textarea name="message" class="form-control" rows="4" required></textarea>
                </div>
                <button type="submit" class="btn btn-danger w-100">Send Message</button>
            </form>
            <div class="text-center mt-3">
                <a href="index.php" class="text-muted">‹ Back to Home</a>
            </div>
        </div>
    </div>
</div>
</body>
</html>