# Error & Success Modal System

A global, reusable error and success modal system for IndiaTravel application.

## Features

✅ **Global Error Handling** - Catches all errors automatically  
✅ **Success Notifications** - Celebrates successful operations  
✅ **Retry Functionality** - Allows users to retry failed actions  
✅ **Detailed Error Messages** - Shows error details in collapsible section  
✅ **Dark Mode Support** - Fully styled for light and dark themes  
✅ **Auto-Dismiss** - Automatically closes after set time  
✅ **Network Error Handling** - Handles fetch and promise rejections  
✅ **Beautiful UI** - Modern, animated modals with Tailwind CSS  

## Usage

### Basic Error Modal

```javascript
// Simple error
showErrorModal('Something went wrong');

// Error with details
showErrorModal('Failed to save', 'Please check your internet connection');

// Error with retry button
showErrorModal('API Error', 'Server not responding', true);
```

### Success Modal

```javascript
showSuccessModal('Your booking has been confirmed!');
```

### In Fetch Requests

**Before (using alerts):**
```javascript
try {
    const response = await fetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) {
        alert('❌ Error: ' + result.message);
    } else {
        alert('✅ Success');
    }
} catch (error) {
    alert('Error: ' + error.message);
}
```

**After (using modals):**
```javascript
try {
    const response = await fetch('/api/bookings', {
        method: 'POST',
        body: JSON.stringify(data)
    });
    const result = await response.json();
    if (!response.ok) {
        showErrorModal(result.message, result.errors, true);
    } else {
        showSuccessModal(result.message);
    }
} catch (error) {
    showErrorModal('An error occurred', error.message, true);
}
```

### Retry Functionality

```javascript
// Enable retry button
showErrorModal('Upload failed', null, true);

// When user clicks retry, lastFailedAction will be called
// You can customize it:
lastFailedAction = () => {
    // Custom retry logic here
};
```

### Auto-Handling Network Errors

The system automatically handles:
- Global JavaScript errors (uncaught exceptions)
- Unhandled promise rejections
- Network timeouts
- CORS errors

No code needed - it just works!

## Styling

### Error Modal Colors
- Header: Red gradient (`from-red-500 to-red-600`)
- Icon: White with red background

### Success Modal Colors
- Header: Green gradient (`from-green-500 to-green-600`)
- Icon: White with green background

Both support dark mode automatically.

## Examples

### Form Submission

```javascript
form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    try {
        const response = await fetch('/api/submit', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formData)
        });
        
        const data = await response.json();
        
        if (response.ok) {
            showSuccessModal(data.message);
            form.reset();
        } else {
            showErrorModal(data.message, data.details, true);
        }
    } catch (error) {
        showErrorModal('Network error', error.message, true);
    }
});
```

### AI Plan Generation

```javascript
async function generatePlan() {
    try {
        const response = await fetch('/api/ai/plan', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(planData)
        });
        
        const data = await response.json();
        
        if (response.ok && data.success) {
            showSuccessModal('✨ Your AI itinerary has been generated!');
            // Process plan data...
        } else {
            showErrorModal(
                data.message || 'Failed to generate plan',
                data.error,
                true
            );
        }
    } catch (error) {
        showErrorModal(
            'Failed to generate plan',
            error.message,
            true
        );
    }
}
```

### Retry with Custom Logic

```javascript
async function uploadFile(file) {
    lastFailedAction = () => uploadFile(file);
    
    try {
        // Upload logic...
    } catch (error) {
        showErrorModal('Upload failed', error.message, true);
    }
}
```

## Functions Reference

### `showErrorModal(message, details, retryable)`
- **message** (string): Main error message
- **details** (string|object): Optional detailed error info
- **retryable** (boolean): Show retry button (default: false)

### `closeErrorModal()`
Manually close the error modal

### `showSuccessModal(message)`
- **message** (string): Success message

### `closeSuccessModal()`
Manually close the success modal

### `retryLastAction()`
Retry the last failed action. Calls `lastFailedAction()` function.

### `fetchWithErrorHandling(url, options, retryable)`
Wrapper around fetch that automatically handles errors
- **url** (string): API endpoint
- **options** (object): Fetch options (method, headers, body, etc.)
- **retryable** (boolean): Enable retry button

## Integration Checklist

- ✅ Error modal component included in boilerplate.ejs
- ✅ Plan-trip page updated with modals
- ✅ Global error/rejection handlers active
- ✅ Dark mode support included

## Next Steps

Update remaining pages:
1. Book-now page - Replace alert() with modals
2. AI Planner page - Use modals for generation feedback
3. Admin pages - Use modals for validation errors
4. All API forms - Use modals for feedback

## Troubleshooting

**Modal not showing?**
- Check console for JavaScript errors
- Ensure error-modal.ejs is included in boilerplate.ejs
- Check z-index conflicts (modal has z-50)

**Styles not applied?**
- Ensure Tailwind CSS is loaded before modal scripts
- Check dark mode class on html element

**Retry not working?**
- Make sure `lastFailedAction` is set before error occurs
- Check that retry button is visible (retryable param = true)
