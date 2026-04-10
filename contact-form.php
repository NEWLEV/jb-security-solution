<?php
/**
 * J&B Security Solutions — PHP Contact Form Handler
 * Optimized for Hostinger Environments
 */

header('Content-Type: application/json');

// Only allow POST requests
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(403);
    echo json_encode(["success" => false, "message" => "Forbidden - Direct access not allowed."]);
    exit;
}

// Honeypot check
if (!empty($_POST['_honey'])) {
    // It's a bot
    echo json_encode(["status" => "success", "message" => "Message processed."]);
    exit;
}

// Configuration
$to_email = "info@jbsecuritysolution.com";
$from_email = "info@jbsecuritysolution.com"; // Use a real domain-based email as sender

// Gather inputs
$first_name = filter_input(INPUT_POST, 'first_name', FILTER_SANITIZE_SPECIAL_CHARS);
$last_name = filter_input(INPUT_POST, 'last_name', FILTER_SANITIZE_SPECIAL_CHARS);
$sender_email = filter_input(INPUT_POST, 'email', FILTER_SANITIZE_EMAIL);
$phone = filter_input(INPUT_POST, 'phone', FILTER_SANITIZE_SPECIAL_CHARS);

// Quote specific fields
$security_type = isset($_POST['service']) ? (is_array($_POST['service']) ? implode(', ', $_POST['service']) : $_POST['service']) : ($_POST['security_type'] ?? '');
$event_date = $_POST['event_date'] ?? '';
$details = $_POST['notes'] ?? $_POST['message'] ?? 'No details provided.';

// Determine subject
$subject_prefix = (!empty($event_date) || !empty($security_type)) ? "[Quote Request]" : "[Contact Form]";
$form_subject = !empty($_POST['subject']) ? " - " . $_POST['subject'] : '';
$subject = $subject_prefix . $form_subject . " from " . $first_name . " " . $last_name;

// Build Message Body
$body = "====================================================\n";
$body .= " NEW WEBSITE SUBMISSION\n";
$body .= "====================================================\n\n";
$body .= "Contact Details:\n";
$body .= "----------------\n";
$body .= "Name: $first_name $last_name\n";
$body .= "Email: $sender_email\n";
$body .= "Phone: $phone\n\n";

if (!empty($event_date) || !empty($security_type)) {
    $body .= "Service Requirements:\n";
    $body .= "---------------------\n";
    $body .= "Services Requested: " . ($security_type ?: 'Not specified') . "\n";
    $body .= "Date: " . ($event_date ?: 'Not specified') . "\n";
    $body .= "Location: " . ($_POST['event_city'] ?? 'Not specified') . "\n";
    $body .= "Venue: " . ($_POST['event_venue'] ?? 'Not specified') . "\n";
    $body .= "Duration: " . ($_POST['event_duration'] ?? 'Not specified') . "\n";
    $body .= "Guard Count: " . ($_POST['guard_count'] ?? 'Not specified') . "\n";
    $body .= "Armed/Unarmed: " . ($_POST['armed'] ?? 'Not specified') . "\n";
    $body .= "Attendance: " . ($_POST['attendance'] ?? 'Not specified') . "\n\n";
}

$body .= "Message/Details:\n";
$body .= "----------------\n";
$body .= $details . "\n\n";
$body .= "====================================================\n";
$body .= "Submission Date: " . date("Y-m-d H:i:s") . "\n";

// Headers
$headers = "From: J&B Website <$from_email>\r\n";
$headers .= "Reply-To: $sender_email\r\n";
$headers .= "MIME-Version: 1.0\r\n";
$headers .= "Content-Type: text/plain; charset=UTF-8\r\n";
$headers .= "X-Mailer: PHP/" . phpversion();

// Send
if (mail($to_email, $subject, $body, $headers, "-f$from_email")) {
    echo json_encode(["status" => "success", "message" => "Your message has been sent successfully."]);
} else {
    http_response_code(500);
    echo json_encode(["status" => "error", "message" => "An error occurred while sending the email."]);
}
?>
