document.addEventListener('DOMContentLoaded', () => {
    // Select all completed buttons and clear history button
    document.querySelectorAll('.bg-btn').forEach(button => {
        if (button.textContent.trim() === 'Completed') {
            button.addEventListener('click', handleTaskCompletion);
        } else if (button.textContent.trim() === 'Clear History') {
            button.addEventListener('click', clearActivityHistory);
        }
    });

    function handleTaskCompletion(event) {
        const button = event.target;
        const taskCard = button.closest('.bg-body-bg.rounded-xl');
        const taskTitle = taskCard.querySelector('h1').textContent;

        // Show alert
        alert(`✅ Task "${taskTitle}" marked as completed!`);

        // Update Task Assigned count
        const taskCountElement = document.getElementById('task-assigned-count');
        let currentCount = parseInt(taskCountElement.textContent, 10);
        currentCount = Math.max(currentCount - 1, 0); // Prevent negative numbers
        taskCountElement.textContent = currentCount.toString().padStart(2, '0');

        // Update Total Completed count
        const totalCompletedElement = document.getElementById('total-completed');
        let total = parseInt(totalCompletedElement.textContent, 10);
        total += 1;
        totalCompletedElement.textContent = total.toString();

        // Add to activity log
        const activityLog = document.getElementById('activity-log');
        const logEntry = document.createElement('div');
        logEntry.className = 'log-entry text-gray-600 text-center text-sm mb-2';
        logEntry.innerHTML = `
        <span class="font-bold text-center">[${getCurrentTime()}]</span> 
        Completed: ${taskTitle}
      `;
        activityLog.appendChild(logEntry);
    }

    function clearActivityHistory() {
        const activityLog = document.getElementById('activity-log');
        activityLog.innerHTML = '';
    }

    function getCurrentTime() {
        return new Date().toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        });
    }
});