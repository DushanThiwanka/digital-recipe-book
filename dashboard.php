<?php
session_start();
require_once __DIR__ . '/includes/db.php';
require_once __DIR__ . '/includes/functions.php';

if (!isLoggedIn()) {
    header("Location: auth/login.php");
    exit;
}

$user_id = $_SESSION['user_id'];
$stmt = $pdo->prepare("SELECT * FROM recipes WHERE user_id = ? ORDER BY id DESC");
$stmt->execute([$user_id]);
$my_recipes = $stmt->fetchAll();
?>
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Dashboard - Yummy.lk</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="css/style.css">
</head>
<body>

<nav class="navbar">
    <a href="index.php" class="logo" style="font-family: Georgia, serif; font-style: italic; font-size: 26px; font-weight: 800; color: #ba0a0a;">Yummy.lk</a>
    <div class="d-flex align-items-center">
        <span class="me-3 fw-semibold text-dark">Welcome, <?= htmlspecialchars($_SESSION['username'] ?? 'User') ?>!</span>
        <a href="index.php" class="btn btn-outline-secondary btn-sm me-2">Home</a>
        <a href="auth/logout.php" class="btn btn-danger btn-sm">Logout</a>
    </div>
</nav>

<div class="container py-5">
    <div class="row">
        <div class="col-md-12 mb-4">
            <h2 class="fw-bold">My Dashboard</h2>
            <p class="text-muted">Manage your submitted recipes and activity.</p>
        </div>

        <div class="col-md-12">
            <div class="card p-4 shadow-sm border-0 rounded-3">
                <h5 class="fw-bold mb-3">My Published Recipes</h5>
                <?php if (!empty($my_recipes)): ?>
                    <div class="table-responsive">
                        <table class="table table-hover align-middle">
                            <thead class="table-light">
                                <tr>
                                    <th>Recipe Title</th>
                                    <th>Date Added</th>
                                </tr>
                            </thead>
                            <tbody>
                                <?php foreach ($my_recipes as $recipe): ?>
                                    <tr>
                                        <td class="fw-semibold"><?= htmlspecialchars($recipe['title']) ?></td>
                                        <td class="text-muted small"><?= $recipe['created_at'] ?></td>
                                    </tr>
                                <?php endforeach; ?>
                            </tbody>
                        </table>
                    </div>
                <?php else: ?>
                    <div class="p-4 text-center bg-light rounded">
                        <p class="text-muted mb-0">You haven't submitted any recipes yet.</p>
                    </div>
                <?php endif; ?>
            </div>
        </div>
    </div>
</div>

</body>
</html>