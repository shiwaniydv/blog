document.addEventListener('DOMContentLoaded', function() {
    const manualBtn = document.getElementById('manualBtn');
    const apiBtn = document.getElementById('apiBtn');
    const manualForm = document.getElementById('manualForm');
    const apiForm = document.getElementById('apiForm');
    const blogForm = document.getElementById('blogForm');
    const apiSearchForm = document.getElementById('apiSearchForm');
    const blogCards = document.getElementById('blogCards');

    // Show manual form
    manualBtn.addEventListener('click', function() {
        manualForm.classList.remove('hidden');
        apiForm.classList.add('hidden');
    });

    // Show API form
    apiBtn.addEventListener('click', function() {
        apiForm.classList.remove('hidden');
        manualForm.classList.add('hidden');
    });

    // Handle manual blog creation
    blogForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const topic = document.getElementById('manualTopic').value;
        const details = document.getElementById('manualDetails').value;
        
        createBlogCard(topic, details, false);
        
        // Reset form
        blogForm.reset();
        manualForm.classList.add('hidden');
    });

    // Handle API blog creation
    apiSearchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const topic = document.getElementById('apiTopic').value;
        searchPosts(topic);
    });

    // Create blog card
    function createBlogCard(topic, details, isFromAPI) {
        const card = document.createElement('div');
        card.className = 'blog-card';
        
        card.innerHTML = `
            <h3>${topic}</h3>
            <p>${details}</p>
        `;
        
        blogCards.appendChild(card);
    }

    // Search JSONPlaceholder API
    function searchPosts(topic) {
        const apiUrl = 'https://jsonplaceholder.typicode.com/posts';
        
        fetch(apiUrl)
            .then(response => {
                if (!response.ok) {
                    throw new Error('API error');
                }
                return response.json();
            })
            .then(data => {
                // Search for posts that match the topic
                const matchingPost = data.find(post => 
                    post.title.toLowerCase().includes(topic.toLowerCase()) ||
                    post.body.toLowerCase().includes(topic.toLowerCase())
                );
                
                if (matchingPost) {
                    const title = matchingPost.title;
                    const description = matchingPost.body;
                    
                    createBlogCard(title, description, true);
                } else {
                    // If no match found, get a random post
                    const randomPost = data[Math.floor(Math.random() * data.length)];
                    createBlogCard(randomPost.title, randomPost.body, true);
                }
                
                // Reset form
                apiSearchForm.reset();
                apiForm.classList.add('hidden');
            })
            .catch(error => {
                alert('API error. Please try again.');
                console.error('Error:', error);
            });
    }
});
