// Mock data that simulates what would be fetched from the JSON URL
        const mockProjectData = {
            "project_title": "Technical Project Management",
            "tasks": [
                {
                    "task_id": "task_1",
                    "task_title": "Technical Project Management",
                    "task_description": "Story of Alignment Scope of Agility Specific Accountable Staggering Approach",
                    "assets": [
                        {
                            "asset_id": "asset_1_1",
                            "asset_title": "Project Overview",
                            "asset_description": "Introduction to technical project management concepts",
                            "asset_type": "video",
                            "asset_content": "<iframe width='100%' height='300' src='https://www.youtube.com/embed/dQw4w9WgXcQ' frameborder='0' allowfullscreen></iframe>"
                        }
                    ]
                },
                {
                    "task_id": "task_2",
                    "task_title": "Threadbuild",
                    "task_description": "Watch the video and threadbuild, and jot out key threads while watching the video",
                    "assets": [
                        {
                            "asset_id": "asset_2_1",
                            "asset_title": "Threadbuild Exercise",
                            "asset_description": "Practice exercise for threadbuilding techniques",
                            "asset_type": "exercise"
                        }
                    ]
                },
                {
                    "task_id": "task_3",
                    "task_title": "Structure your Pointers",
                    "task_description": "Write a 300 - 400 word article from your thread. Publish your understanding and showcase your understanding to the entire world",
                    "assets": [
                        {
                            "asset_id": "asset_3_1",
                            "asset_title": "Article Structuring",
                            "asset_description": "Guidelines for structuring your article effectively",
                            "asset_type": "guideline"
                        }
                    ]
                },
                {
                    "task_id": "task_4",
                    "task_title": "4SA Method",
                    "task_description": "To explore more read more",
                    "assets": [
                        {
                            "asset_id": "asset_4_1",
                            "asset_title": "4SA Method Introduction",
                            "asset_description": "Introduction to the 4SA method for project management",
                            "asset_type": "lesson"
                        }
                    ]
                }
            ]
        };

        // Global variable to store the project data
        let projectData = null;

        // Function to fetch JSON data with error handling
        async function fetchProjectData() {
            const JSON_URL = "https://dev.deepthought.education/assets/uploads/files/files/others/ddugky_project.json";
            
            try {
                // Show loading state
                document.getElementById('content-grid').innerHTML = '<div class="loading">Loading project data...</div>';
                
                const response = await fetch(JSON_URL);
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const data = await response.json();
                return data;
            } catch (error) {
                console.error("Error fetching project data:", error);
                // Don't show error message yet, let the user try mock data first
                return null;
            }
        }

        // Function to load mock data
        function loadMockData() {
            projectData = mockProjectData;
            renderSidebar(projectData);
            renderAllTasksContent(); // Render all tasks instead of just the first one
            
            // Show success message
            const successMsg = document.getElementById('success-message');
            successMsg.style.display = 'block';
            setTimeout(() => {
                successMsg.style.display = 'none';
            }, 3000);
        }

        // Function to render sidebar navigation
        function renderSidebar(data) {
            const sidebarList = document.getElementById('sidebar-list');
            if (!data || !data.tasks) {
                sidebarList.innerHTML = '<li>No tasks available</li>';
                return;
            }
            
            let sidebarHTML = '<li>Explore the world of management</li><ul>';
            
            data.tasks.forEach(task => {
                sidebarHTML += `<li data-task-id="${task.task_id}">${task.task_title}</li>`;
            });
            
            sidebarHTML += '</ul>';
            sidebarList.innerHTML = sidebarHTML;
            
            // Add click event listeners to sidebar items
            const taskItems = sidebarList.querySelectorAll('li[data-task-id]');
            taskItems.forEach(item => {
                item.addEventListener('click', () => {
                    const taskId = item.getAttribute('data-task-id');
                    
                    // Update active state
                    taskItems.forEach(i => i.style.fontWeight = 'normal');
                    item.style.fontWeight = 'bold';
                });
            });
        }

        // Function to render ALL tasks content (not just one)
        function renderAllTasksContent() {
            const grid = document.getElementById('content-grid');
            if (!projectData || !projectData.tasks) {
                grid.innerHTML = '<div class="error">No task data available</div>';
                return;
            }
            
            // Update project title
            document.getElementById('project-title').textContent = projectData.project_title;
            
            // Render ALL tasks with their assets
            let gridHTML = '';
            
            projectData.tasks.forEach(task => {
                if (task.assets && task.assets.length > 0) {
                    task.assets.forEach(asset => {
                        gridHTML += createAssetCard(asset, task);
                    });
                } else {
                    gridHTML += `<div class="card">
                        <div class="title">
                            <h3>${task.task_title}</h3>
                            <p><b>Description:</b> ${task.task_description || 'No description available'}</p>
                        </div>
                        <div style="padding: 20px;">This task has no assets to display.</div>
                    </div>`;
                }
            });
            
            grid.innerHTML = gridHTML;
        }

        // Function to create asset card based on asset type
        function createAssetCard(asset, task) {
            // Determine which template to use based on asset type or content
            if (task.task_title.includes("Threadbuild")) {
                return createThreadbuildCard(asset, task);
            } else if (task.task_title.includes("Structure")) {
                return createStructureCard(asset, task);
            } else if (task.task_title.includes("4SA")) {
                return create4SACard(asset, task);
            } else {
                return createDefaultCard(asset, task);
            }
        }

        // Card template functions
        function createDefaultCard(asset, task) {
            return `
                <div class="card">
                    <div class="title">
                        <h3>${asset.asset_title || task.task_title || 'Untitled Asset'}</h3>
                        <p><b>Description:</b> ${asset.asset_description || task.task_description || 'No description available'}</p>
                    </div>
                    ${asset.asset_content ? `<div style="padding: 20px;">${asset.asset_content}</div>` : 
                    `<div style="padding: 20px;">Content for ${asset.asset_title || task.task_title}</div>`}
                </div>
            `;
        }

        function createThreadbuildCard(asset, task) {
            return `
                <div class="card">
                    <div class="title">
                        <h3>${asset.asset_title || 'Threadbuild'}</h3>
                        <p><b>Description:</b> ${asset.asset_description || task.task_description || 'Watch the video and threadbuild, and jot out key threads while watching the video'}</p>
                    </div>
                    <div class="heading" style="background-color: rgba(255, 235, 205, 0.596);">
                        <i class="fa-solid fa-angle-up"></i>
                        <h2>Thread A</h2>
                    </div>

                    <div class="thread">
                        <div class="Sub-thread">
                            <p style="font-size: large;">Sub thread 1</p>
                            <textarea placeholder="Summary for Thread A"></textarea>
                        </div>
                        <div class="Sub-thread">
                            <p style="font-size: large;">Sub thread 2</p>
                            <textarea placeholder="Summary for Thread B"></textarea>
                        </div>
                    </div>
                    <div class="catgry">
                        <div class="icon">
                            <i class="fa-solid fa-lightbulb"></i>
                            <i class="fa-solid fa-message"></i>
                            <i class="fa-solid fa-message-question"></i>
                            <i class="fa-solid fa-comment-sms"></i>
                            <i class="fa-brands fa-pied-piper-hat"></i>
                        </div>
                        <div>
                            <select name="" id="">
                                <option value="">Select Category</option>
                                <option value="">Category 1</option>
                                <option value="">Category 2</option>
                                <option value="">Category 3</option>
                            </select>
                            <select name="" id="">
                                <option value="">Select Process</option>
                                <option value="">Process 1</option>
                                <option value="">Process 2</option>
                                <option value="">Process 3</option>
                            </select>
                        </div>
                    </div>
                    <button style="margin-left: 30px; width: 97px;height: 36px;">+ Sub-thread</button>
                    <div class="Sub-thread" style="width: 90%; margin: auto; margin-top: 20px;">
                        <p>Summary for Thread A</p>
                        <textarea placeholder="Summary for Thread A"></textarea>
                    </div>
                </div>
            `;
        }

        function createStructureCard(asset, task) {
            return `
                <div class="card">
                    <div class="title">
                        <h3>${asset.asset_title || 'Structure your Pointers'}</h3>
                        <p><b>Description:</b> ${asset.asset_description || task.task_description || 'Write a 300 - 400 word article from your thread. Publish your understanding and showcase your understanding to the entire world'}</p>
                    </div>
                    <div style="padding: 40px;">
                        <div>
                            <p><b>Title:</b></p>
                            <input type="text" placeholder="Title" value="${asset.asset_title || ''}">
                            <div style="margin-top: 20px;">
                                <p><b>Content:</b></p>
                                <textarea placeholder="Content">Start writing your article here...</textarea>
                            </div>
                        </div>
                    </div>
                </div>
            `;
        }

        function create4SACard(asset, task) {
            return `
                <div class="card">
                    <div class="title">
                        <h3>${asset.asset_title || '4SA Method'}</h3>
                        <p><b>Description:</b> ${asset.asset_description || task.task_description || 'To explore more read more'}</p>
                    </div>
                    <div style="margin: 10px 40px ; height: 150px;">
                        <div class="heading">
                            <i class="fa-solid fa-angle-up"></i>
                            <h2>Introduction</h2>
                        </div>
                        <p style="margin: 15px ;">The 4SA Method, How to bring an idea into progress?</p>
                    </div>
                    <div style="margin: 0 40px ; height: 10px;">
                        <div class="heading">
                            <i class="fa-solid fa-angle-up"></i>
                            <h2>Thread A</h2>
                        </div>
                        <p style="margin: 15px ;">How are you going to develop your strategy? Which method are you going to use to develop a strategy? What if the project is lengthy</p>
                    </div>
                </div>
            `;
        }

        // Initialize the application
        document.addEventListener('DOMContentLoaded', async () => {
            // Try to fetch real data first
            const data = await fetchProjectData();
            if (data) {
                projectData = data;
                renderSidebar(projectData);
                renderAllTasksContent(); // Render all tasks instead of just the first one
            } else {
                // Show message about CORS issue
                document.getElementById('content-grid').innerHTML = `
                    <div class="card">
                        <div class="title">
                            <h3>CORS Issue Detected</h3>
                            <p><b>Description:</b> The browser is blocking access to the external JSON data due to CORS restrictions. Please click the "Load Demo Project Data" button to view sample content.</p>
                        </div>
                    </div>
                `;
            }
            
            // Add event listener for the mock data button
            document.getElementById('load-mock-data').addEventListener('click', loadMockData);
        });