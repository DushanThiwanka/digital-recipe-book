<?php
// api_recipes.php
header('Content-Type: application/json');
require_once 'db.php';
session_start();

$method = $_SERVER['REQUEST_METHOD'];

if ($method === 'GET') {
    // Single recipe by ID or List by Category/Search
    if (isset($_GET['id'])) {
        $stmt = $pdo->prepare("SELECT * FROM recipes WHERE id = ?");
        $stmt->execute([$_GET['id']]);
        $recipe = $stmt->fetch();
        
        if ($recipe) {
            echo json_encode(['success' => true, 'recipe' => $recipe]);
        } else {
            echo json_encode(['success' => false, 'message' => 'Recipe not found']);
        }
        exit;
    }

    $category = $_GET['category'] ?? null;
    $search = $_GET['search'] ?? null;

    $query = "SELECT * FROM recipes WHERE 1=1";
    $params = [];

    if ($category) {
        $query .= " AND category = ?";
        $params[] = $category;
    }

    if ($search) {
        $query .= " AND (title LIKE ? OR ingredients LIKE ?)";
        $params[] = "%$search%";
        $params[] = "%$search%";
    }

    $query .= " ORDER BY id DESC";
    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $recipes = $stmt->fetchAll();

    echo json_encode(['success' => true, 'recipes' => $recipes]);
    exit;
}

if ($method === 'POST') {
    $title = trim($_POST['title'] ?? '');
    $category = trim($_POST['category'] ?? '');
    $sub_category = !empty($_POST['sub_category']) ? trim($_POST['sub_category']) : null;
    $prep_time = trim($_POST['prep_time'] ?? '15 mins');
    $cook_time = trim($_POST['cook_time'] ?? '20 mins');
    $servings = trim($_POST['servings'] ?? '4 Persons');
    $difficulty = trim($_POST['difficulty'] ?? 'Easy');
    $description = trim($_POST['description'] ?? '');
    $ingredients = trim($_POST['ingredients'] ?? '');
    $instructions = trim($_POST['instructions'] ?? '');
    $user_id = $_SESSION['user_id'] ?? null;

    if (empty($title) || empty($category) || empty($description) || empty($ingredients) || empty($instructions)) {
        echo json_encode(['success' => false, 'message' => 'Please fill in all required fields.']);
        exit;
    }

    // Image Upload Handling
    $image_url = 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&w=600&q=80';
    if (!empty($_FILES['image']['name'])) {
        $uploadDir = 'uploads/';
        if (!is_dir($uploadDir)) {
            mkdir($uploadDir, 0755, true);
        }

        $fileName = time() . '_' . basename($_FILES['image']['name']);
        $targetFilePath = $uploadDir . $fileName;
        $fileType = strtolower(pathinfo($targetFilePath, PATHINFO_EXTENSION));

        $allowedTypes = ['jpg', 'jpeg', 'png', 'webp'];
        if (in_array($fileType, $allowedTypes) && move_uploaded_file($_FILES['image']['tmp_name'], $targetFilePath)) {
            $image_url = $targetFilePath;
        }
    }

    $sql = "INSERT INTO recipes (user_id, category, sub_category, title, prep_time, cook_time, servings, difficulty, description, ingredients, instructions, image_url) 
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$user_id, $category, $sub_category, $title, $prep_time, $cook_time, $servings, $difficulty, $description, $ingredients, $instructions, $image_url]);

    echo json_encode(['success' => true, 'message' => 'Recipe published successfully!', 'recipe_id' => $pdo->lastInsertId()]);
    exit;
}