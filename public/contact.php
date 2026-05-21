<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json");

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Try to get JSON data from request body
    $json = file_get_contents('php://input');
    $data = json_decode($json, true);

    // If JSON decoding fails, try $_POST (for FormData)
    if (empty($data)) {
        $data = $_POST;
    }

    $lang = isset($data["lang"]) ? strip_tags(trim($data["lang"])) : 'en';

    $messages = [
        'en' => [
            'no_data' => 'No data received',
            'fill_required' => 'Please fill in all required fields.',
            'invalid_email' => 'Invalid email format.',
            'success' => 'Thank you! Your message has been sent.',
            'error' => 'Oops! Something went wrong and we couldn\'t send your message.'
        ],
        'et' => [
            'no_data' => 'Andmeid ei saadud',
            'fill_required' => 'Palun täitke kõik kohustuslikud väljad.',
            'invalid_email' => 'Vigane e-posti formaat.',
            'success' => 'Aitäh! Teie sõnum on saadetud.',
            'error' => 'Vabandust! Midagi läks valesti ja me ei saanud teie sõnumit saata.'
        ]
    ];

    if (!array_key_exists($lang, $messages)) {
        $lang = 'en';
    }

    if (empty($data)) {
        echo json_encode(["status" => "error", "message" => $messages[$lang]['no_data']]);
        exit;
    }

    $name = isset($data["name"]) ? strip_tags(trim($data["name"])) : "";
    $email = isset($data["email"]) ? filter_var(trim($data["email"]), FILTER_SANITIZE_EMAIL) : "";
    $company = isset($data["company"]) ? strip_tags(trim($data["company"])) : "";
    $service = isset($data["service"]) ? strip_tags(trim($data["service"])) : "";
    $message = isset($data["message"]) ? strip_tags(trim($data["message"])) : "";

    // Validation
    if (empty($name) || empty($email) || empty($message)) {
        echo json_encode(["status" => "error", "message" => $messages[$lang]['fill_required']]);
        exit;
    }

    if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
        echo json_encode(["status" => "error", "message" => $messages[$lang]['invalid_email']]);
        exit;
    }

    // Email Configuration
    $to = "kontakt@moonum.ee";
    $subject = "New Contact Form Submission from $name";
    
    // Email Content
    $email_content = "Name: $name\n";
    $email_content .= "Email: $email\n";
    $email_content .= "Company: $company\n";
    $email_content .= "Service: $service\n\n";
    $email_content .= "Message:\n$message\n";

    // Email Headers
    // Using current host to ensure delivery on temporary and final domains
    $headers = "From: Moonum Website <kontakt@moonum.ee>\r\n";
    $headers .= "Reply-To: $email\r\n";
    $headers .= "X-Mailer: PHP/" . phpversion();
    $headers .= "MIME-Version: 1.0\r\n";
    $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

    // Send Email
    if (mail($to, $subject, $email_content, $headers)) {
        echo json_encode(["status" => "success", "message" => $messages[$lang]['success']]);
    } else {
        echo json_encode(["status" => "error", "message" => $messages[$lang]['error']]);
    }
} else {
    echo json_encode(["status" => "error", "message" => "Method not allowed"]);
}
?>
