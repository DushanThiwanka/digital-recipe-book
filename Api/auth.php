<?php
// api_auth.php
header('Content-Type: application/json');
require_once 'db.php';
session_start();

$action = $_GET['action'] ?? '';

if ($action === 'register' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $full_name = trim($_POST['full_name'] ?? '');
    $email     = trim($_POST['email'] ?? '');
    $phone     = trim($_POST['phone'] ?? '');
    $password  = $_POST['password'] ?? '';

    if (empty($full_name) || empty($email) || empty($phone) || strlen($password) < 6) {
        echo json_encode(['success' => false, 'message' => 'Please provide valid registration details (Password minimum 6 characters).']);
        exit;
    }

    $stmt = $pdo->prepare("SELECT id FROM users WHERE email = ? OR phone = ?");
    $stmt->execute([$email, $phone]);
    if ($stmt->fetch()) {
        echo json_encode(['success' => false, 'message' => 'Email or Mobile Number already registered.']);
        exit;
    }

    $password_hash = password_hash($password, PASSWORD_BCRYPT);
    $insert = $pdo->prepare("INSERT INTO users (full_name, email, phone, password_hash) VALUES (?, ?, ?, ?)");
    $insert->execute([$full_name, $email, $phone, $password_hash]);

    $_SESSION['user_id'] = $pdo->lastInsertId();
    $_SESSION['user_name'] = $full_name;

    echo json_encode(['success' => true, 'message' => 'Account created successfully!', 'user' => ['name' => $full_name, 'email' => $email]]);
    exit;
}

if ($action === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $identifier = trim($_POST['identifier'] ?? '');
    $password   = $_POST['password'] ?? '';

    $stmt = $pdo->prepare("SELECT * FROM users WHERE email = ? OR phone = ?");
    $stmt->execute([$identifier, $identifier]);
    $user = $stmt->fetch();

    if ($user && password_verify($password, $user['password_hash'])) {
        $_SESSION['user_id'] = $user['id'];
        $_SESSION['user_name'] = $user['full_name'];

        echo json_encode([
            'success' => true,
            'message' => 'Signed in successfully!',
            'user' => ['id' => $user['id'], 'name' => $user['full_name'], 'email' => $user['email']]
        ]);
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid email/phone or password.']);
    }
    exit;
}

if ($action === 'check_session') {
    if (!empty($_SESSION['user_id'])) {
        echo json_encode(['logged_in' => true, 'user' => ['id' => $_SESSION['user_id'], 'name' => $_SESSION['user_name']]]);
    } else {
        echo json_encode(['logged_in' => false]);
    }
    exit;
}

if ($action === 'logout') {
    session_destroy();
    echo json_encode(['success' => true]);
    exit;
}