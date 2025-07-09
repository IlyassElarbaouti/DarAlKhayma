# Test Contact API with hardcoded values from .env.local

# Test data
$testData = @{
    name = "Test User - Curl Script"
    email = "test-curl@example.com"
    phone = "555-123-4567"
    inquiryType = "general"
    subject = "Test Contact Form Submission"
    message = "This is a test message to verify the contact form API endpoint works correctly."
} | ConvertTo-Json

Write-Host "Testing Contact API Endpoint..."
Write-Host "URL: http://localhost:3001/api/contact"
Write-Host "Data: $testData"
Write-Host ""

try {
    $response = Invoke-RestMethod -Uri "http://localhost:3001/api/contact" -Method POST -Body $testData -ContentType "application/json"
    Write-Host "SUCCESS! Response:"
    $response | ConvertTo-Json -Depth 3
} catch {
    Write-Host "ERROR: $($_.Exception.Message)"
    
    if ($_.Exception.Response) {
        $statusCode = $_.Exception.Response.StatusCode.value__
        Write-Host "Status Code: $statusCode"
        
        if ($statusCode -eq 500) {
            Write-Host "This is likely the Sanity permissions issue we identified."
        }
    }
}
