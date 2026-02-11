'use client';
export const dynamic = "force-dynamic";
import React, { useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithCustomToken, onAuthStateChanged } from 'firebase/auth';
import {
    getFirestore, doc, onSnapshot, updateDoc, setDoc,
} from 'firebase/firestore';

// Lucide React Icons - loaded via CDN for a single-file build
import { Home, FolderGit, Award, Settings, Plus, Trash2, Save, X, Edit, Copy } from 'lucide-react';

// Global Firebase variables provided by the canvas environment.
const appId = typeof __app_id !== 'undefined' ? __app_id : 'default-app-id';
const firebaseConfig = typeof __firebase_config !== 'undefined' ? JSON.parse(__firebase_config) : {};
const initialAuthToken = typeof __initial_auth_token !== 'undefined' ? __initial_auth_token : null;

// The main App component
const App = () => {
    const [db, setDb] = useState(null);
    const [auth, setAuth] = useState(null);
    const [userId, setUserId] = useState(null);
    const [portfolioData, setPortfolioData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState('dashboard');
    const [isEditing, setIsEditing] = useState(false);
    const [editedData, setEditedData] = useState({});
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState(null);
    const [message, setMessage] = useState('');
    const [isCopied, setIsCopied] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false); // New state for login status

    // --- Firebase Initialization and Authentication ---
    useEffect(() => {
        try {
            const firebaseApp = initializeApp(firebaseConfig);
            const authInstance = getAuth(firebaseApp);
            const dbInstance = getFirestore(firebaseApp);
            setAuth(authInstance);
            setDb(dbInstance);

            // Listen for auth state changes and sign in with the custom token.
            onAuthStateChanged(authInstance, async (user) => {
                if (user) {
                    setUserId(user.uid);
                    console.log("User signed in with UID:", user.uid);
                } else {
                    console.log("No user signed in. Attempting custom token sign-in.");
                    if (initialAuthToken) {
                        try {
                            await signInWithCustomToken(authInstance, initialAuthToken);
                        } catch (error) {
                            console.error("Error signing in with custom token:", error);
                        }
                    } else {
                        console.error("Initial auth token is missing.");
                    }
                }
            });
        } catch (error) {
            console.error("Failed to initialize Firebase:", error);
        }
    }, []);

    // --- Firestore Data Fetching ---
    useEffect(() => {
        if (!db || !userId) {
            setIsLoading(false);
            return;
        }

        const docPath = `/artifacts/${appId}/users/${userId}/portfolio_data/main_data`;
        const docRef = doc(db, docPath);

        const unsubscribe = onSnapshot(docRef, (snapshot) => {
            if (snapshot.exists()) {
                setPortfolioData(snapshot.data());
                console.log("Portfolio data loaded successfully.");
            } else {
                console.log("No portfolio data found. Creating a default document.");
                const defaultData = {
                    bio: {
                        name: 'Your Name',
                        title: 'Your Title',
                        description: 'A brief description about you and your work. Click Edit to change.',
                        profileImageUrl: 'https://placehold.co/150x150/22c55e/ffffff?text=Profile',
                    },
                    projects: [],
                    skills: [],
                };
                setDoc(docRef, defaultData).then(() => {
                    setPortfolioData(defaultData);
                }).catch(error => {
                    console.error("Error creating default portfolio data:", error);
                });
            }
            setIsLoading(false);
        }, (error) => {
            console.error("Error fetching portfolio data:", error);
            setIsLoading(false);
        });

        // Cleanup the listener on component unmount
        return () => unsubscribe();
    }, [db, userId]);

    // --- General Utility Functions ---
    const showInfoMessage = (msg) => {
        setMessage(msg);
        setTimeout(() => setMessage(''), 3000);
    };

    const copyUserId = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(userId);
            setIsCopied(true);
            setTimeout(() => setIsCopied(false), 2000);
        } else {
            document.execCommand('copy');
        }
    };

    const openModal = (content) => {
        setModalContent(content);
        setShowModal(true);
    };

    const closeModal = () => {
        setShowModal(false);
        setModalContent(null);
    };

    const handleLogin = (username, password) => {
        if (username === 'admin' && password === 'password') {
            setIsLoggedIn(true);
            showInfoMessage('Login successful!');
        } else {
            showInfoMessage('Invalid username or password.');
        }
    };

    // --- Data Management Functions ---
    const handleSave = async (dataToSave) => {
        if (!db || !userId || !portfolioData) {
            showInfoMessage("Database not ready.");
            return;
        }
        setIsLoading(true);
        const docPath = `/artifacts/${appId}/users/${userId}/portfolio_data/main_data`;
        const docRef = doc(db, docPath);
        try {
            await updateDoc(docRef, dataToSave);
            showInfoMessage('Changes saved successfully!');
            setIsEditing(false);
            setEditedData({});
        } catch (error) {
            console.error("Error saving data:", error);
            showInfoMessage('Failed to save changes.');
        } finally {
            setIsLoading(false);
        }
    };

    // Add a new project or skill
    const handleAddItem = async (itemType, newItem) => {
        if (!db || !userId) {
            showInfoMessage("Database not ready.");
            return;
        }
        setIsLoading(true);
        const docPath = `/artifacts/${appId}/users/${userId}/portfolio_data/main_data`;
        const docRef = doc(db, docPath);
        const newItems = [...(portfolioData[itemType] || []), newItem];
        try {
            await updateDoc(docRef, { [itemType]: newItems });
            showInfoMessage(`${itemType.slice(0, -1)} added successfully!`);
        } catch (error) {
            console.error("Error adding item:", error);
            showInfoMessage(`Failed to add ${itemType.slice(0, -1)}.`);
        } finally {
            setIsLoading(false);
        }
        closeModal();
    };

    // Delete a project or skill
    const handleDeleteItem = async (itemType, index) => {
        if (!db || !userId) {
            showInfoMessage("Database not ready.");
            return;
        }
        setIsLoading(true);
        const docPath = `/artifacts/${appId}/users/${userId}/portfolio_data/main_data`;
        const docRef = doc(db, docPath);
        const updatedItems = portfolioData[itemType].filter((_, i) => i !== index);
        try {
            await updateDoc(docRef, { [itemType]: updatedItems });
            showInfoMessage(`${itemType.slice(0, -1)} deleted successfully!`);
        } catch (error) {
            console.error("Error deleting item:", error);
            showInfoMessage(`Failed to delete ${itemType.slice(0, -1)}.`);
        } finally {
            setIsLoading(false);
        }
        closeModal();
    };

    // Edit a project or skill
    const handleEditItem = (itemType, index, updatedItem) => {
        const updatedItems = [...portfolioData[itemType]];
        updatedItems[index] = updatedItem;
        handleSave({ [itemType]: updatedItems });
        closeModal();
    };


    // --- UI Components ---
    const SideNav = () => (
        <aside className="w-64 bg-slate-900 text-white min-h-screen p-4 rounded-r-2xl shadow-lg">
            <h1 className="text-3xl font-bold text-center mb-8 text-green-400">Admin Panel</h1>
            <nav>
                <ul>
                    {['dashboard', 'projects', 'skills', 'settings'].map((page) => (
                        <li key={page} className="mb-2">
                            <button
                                onClick={() => setCurrentPage(page)}
                                className={`flex items-center w-full px-4 py-3 rounded-lg transition-colors duration-200 ${
                                    currentPage === page
                                        ? 'bg-slate-700 text-green-400 shadow-inner'
                                        : 'hover:bg-slate-800'
                                }`}
                            >
                                {page === 'dashboard' && <Home size={20} className="mr-3" />}
                                {page === 'projects' && <FolderGit size={20} className="mr-3" />}
                                {page === 'skills' && <Award size={20} className="mr-3" />}
                                {page === 'settings' && <Settings size={20} className="mr-3" />}
                                <span className="capitalize">{page}</span>
                            </button>
                        </li>
                    ))}
                </ul>
            </nav>
            <div className="absolute bottom-4 left-4 right-4">
                <div className="bg-slate-800 p-3 rounded-lg text-xs break-words">
                    <span className="font-semibold text-gray-400">User ID:</span>
                    <div className="flex items-center justify-between mt-1">
                        <span className="truncate mr-2">{userId || 'Loading...'}</span>
                        <button onClick={copyUserId} className="p-1 rounded-full hover:bg-slate-700 transition-colors">
                            {isCopied ? <span className="text-green-400">Copied!</span> : <Copy size={16} />}
                        </button>
                    </div>
                </div>
            </div>
        </aside>
    );

    const DashboardSection = () => (
        <div className="p-8">
            <h2 className="text-4xl font-bold mb-6 text-slate-800">Dashboard</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-slate-50 rounded-xl shadow-lg p-6 border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Total Projects</h3>
                    <p className="text-5xl font-extrabold text-green-500">
                        {portfolioData?.projects?.length || 0}
                    </p>
                </div>
                <div className="bg-slate-50 rounded-xl shadow-lg p-6 border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Total Skills</h3>
                    <p className="text-5xl font-extrabold text-blue-500">
                        {portfolioData?.skills?.length || 0}
                    </p>
                </div>
                <div className="bg-slate-50 rounded-xl shadow-lg p-6 border border-slate-200">
                    <h3 className="text-xl font-semibold text-slate-700 mb-2">Last Updated</h3>
                    <p className="text-xl font-medium text-slate-500">
                        {new Date().toLocaleDateString()}
                    </p>
                </div>
            </div>
        </div>
    );

    const SettingsSection = () => {
        const { bio } = portfolioData || { bio: {} };
        const [localBio, setLocalBio] = useState(bio);

        const handleBioChange = (e) => {
            const { name, value } = e.target;
            setLocalBio(prev => ({ ...prev, [name]: value }));
        };

        const handleSaveBio = () => {
            handleSave({ bio: localBio });
            setIsEditing(false);
        };

        return (
            <div className="p-8">
                <h2 className="text-4xl font-bold mb-6 text-slate-800">Account Settings</h2>
                <div className="bg-slate-50 p-8 rounded-2xl shadow-xl">
                    <div className="flex items-center mb-6">
                        <img src={localBio?.profileImageUrl || 'https://placehold.co/150x150/22c55e/ffffff?text=Profile'} alt="Profile" className="w-24 h-24 rounded-full mr-6 border-4 border-white shadow-md" />
                        <div className="flex-1">
                            <h3 className="text-3xl font-semibold text-slate-800">{localBio?.name}</h3>
                            <p className="text-lg text-green-500">{localBio?.title}</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-slate-600 mb-1">Name</label>
                            <input
                                type="text"
                                name="name"
                                value={localBio?.name || ''}
                                onChange={handleBioChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-slate-600 mb-1">Title</label>
                            <input
                                type="text"
                                name="title"
                                value={localBio?.title || ''}
                                onChange={handleBioChange}
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-sm font-medium text-slate-600 mb-1">Description</label>
                            <textarea
                                name="description"
                                value={localBio?.description || ''}
                                onChange={handleBioChange}
                                rows="4"
                                className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                            ></textarea>
                        </div>
                        <div className="flex justify-end">
                            <button
                                onClick={handleSaveBio}
                                className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors flex items-center"
                            >
                                <Save size={18} className="mr-2" /> Save Changes
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const ProjectForm = ({ project = {}, onSave, onCancel }) => {
        const [formData, setFormData] = useState(project);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            onSave(formData);
        };

        return (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <h3 className="text-2xl font-bold mb-4">{project.title ? 'Edit Project' : 'Add New Project'}</h3>
                <div className="space-y-4">
                    <input type="text" name="title" placeholder="Project Title" value={formData.title || ''} onChange={handleChange} required className="w-full p-3 rounded-lg border border-slate-300" />
                    <textarea name="description" placeholder="Project Description" value={formData.description || ''} onChange={handleChange} required rows="4" className="w-full p-3 rounded-lg border border-slate-300" />
                    <input type="text" name="imageUrl" placeholder="Image URL" value={formData.imageUrl || ''} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300" />
                    <input type="text" name="projectUrl" placeholder="Project URL (optional)" value={formData.projectUrl || ''} onChange={handleChange} className="w-full p-3 rounded-lg border border-slate-300" />
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                    <button type="button" onClick={onCancel} className="flex items-center px-4 py-2 rounded-lg text-slate-600 border border-slate-300 hover:bg-slate-100 transition-colors">
                        <X size={18} className="mr-2" /> Cancel
                    </button>
                    <button type="submit" className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors">
                        <Save size={18} className="mr-2" /> Save
                    </button>
                </div>
            </form>
        );
    };

    const ProjectsSection = () => {
        const { projects } = portfolioData || { projects: [] };
        const [isAdding, setIsAdding] = useState(false);
        const [editingIndex, setEditingIndex] = useState(null);

        return (
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-4xl font-bold text-slate-800">Projects</h2>
                    <button
                        onClick={() => openModal(<ProjectForm onSave={(item) => handleAddItem('projects', item)} onCancel={closeModal} />)}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors flex items-center"
                    >
                        <Plus size={20} className="mr-2" /> Add Project
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {projects.length > 0 ? (
                        projects.map((project, index) => (
                            <div key={index} className="bg-slate-50 p-6 rounded-2xl shadow-lg border border-slate-200 flex flex-col">
                                <img src={project.imageUrl || 'https://placehold.co/400x250/334155/ffffff?text=Project'} alt={project.title} className="w-full h-40 object-cover rounded-xl mb-4" />
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">{project.title}</h3>
                                <p className="text-slate-600 flex-grow mb-4">{project.description}</p>
                                <div className="flex space-x-2 mt-auto">
                                    <button
                                        onClick={() => openModal(<ProjectForm project={project} onSave={(updated) => handleEditItem('projects', index, updated)} onCancel={closeModal} />)}
                                        className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => openModal(<ConfirmDeleteModal onConfirm={() => handleDeleteItem('projects', index)} onCancel={closeModal} item="project" />)}
                                        className="p-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500 col-span-full text-center">No projects found. Add one to get started!</p>
                    )}
                </div>
            </div>
        );
    };

    const SkillForm = ({ skill = {}, onSave, onCancel }) => {
        const [formData, setFormData] = useState(skill);

        const handleChange = (e) => {
            const { name, value } = e.target;
            setFormData(prev => ({ ...prev, [name]: value }));
        };

        const handleSubmit = (e) => {
            e.preventDefault();
            onSave(formData);
        };

        return (
            <form onSubmit={handleSubmit} className="bg-white p-6 rounded-xl shadow-lg border border-slate-200">
                <h3 className="text-2xl font-bold mb-4">{skill.name ? 'Edit Skill' : 'Add New Skill'}</h3>
                <div className="space-y-4">
                    <input type="text" name="name" placeholder="Skill Name (e.g., React, Node.js)" value={formData.name || ''} onChange={handleChange} required className="w-full p-3 rounded-lg border border-slate-300" />
                    <input type="number" name="level" placeholder="Proficiency (1-100)" value={formData.level || ''} onChange={handleChange} min="1" max="100" required className="w-full p-3 rounded-lg border border-slate-300" />
                </div>
                <div className="flex justify-end space-x-2 mt-6">
                    <button type="button" onClick={onCancel} className="flex items-center px-4 py-2 rounded-lg text-slate-600 border border-slate-300 hover:bg-slate-100 transition-colors">
                        <X size={18} className="mr-2" /> Cancel
                    </button>
                    <button type="submit" className="flex items-center px-4 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors">
                        <Save size={18} className="mr-2" /> Save
                    </button>
                </div>
            </form>
        );
    };

    const SkillsSection = () => {
        const { skills } = portfolioData || { skills: [] };

        return (
            <div className="p-8">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-4xl font-bold text-slate-800">Skills</h2>
                    <button
                        onClick={() => openModal(<SkillForm onSave={(item) => handleAddItem('skills', item)} onCancel={closeModal} />)}
                        className="px-6 py-2 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors flex items-center"
                    >
                        <Plus size={20} className="mr-2" /> Add Skill
                    </button>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {skills.length > 0 ? (
                        skills.map((skill, index) => (
                            <div key={index} className="bg-slate-50 p-6 rounded-2xl shadow-lg border border-slate-200">
                                <h3 className="text-2xl font-bold text-slate-800 mb-2">{skill.name}</h3>
                                <div className="w-full bg-slate-200 rounded-full h-4 mb-3">
                                    <div
                                        className="bg-blue-500 h-4 rounded-full"
                                        style={{ width: `${skill.level}%` }}
                                    ></div>
                                </div>
                                <p className="text-sm text-slate-500 text-right">{skill.level}% Proficiency</p>
                                <div className="flex justify-end space-x-2 mt-4">
                                    <button
                                        onClick={() => openModal(<SkillForm skill={skill} onSave={(updated) => handleEditItem('skills', index, updated)} onCancel={closeModal} />)}
                                        className="p-3 bg-blue-500 text-white rounded-full shadow-md hover:bg-blue-600 transition-colors"
                                    >
                                        <Edit size={18} />
                                    </button>
                                    <button
                                        onClick={() => openModal(<ConfirmDeleteModal onConfirm={() => handleDeleteItem('skills', index)} onCancel={closeModal} item="skill" />)}
                                        className="p-3 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600 transition-colors"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-slate-500 col-span-full text-center">No skills found. Add one to get started!</p>
                    )}
                </div>
            </div>
        );
    };

    const ConfirmDeleteModal = ({ onConfirm, onCancel, item }) => (
        <div className="p-6 text-center">
            <h3 className="text-2xl font-bold text-red-600 mb-4">Are you sure?</h3>
            <p className="text-slate-600 mb-6">
                Do you really want to delete this {item}? This action cannot be undone.
            </p>
            <div className="flex justify-center space-x-4">
                <button
                    onClick={onCancel}
                    className="px-6 py-2 rounded-lg text-slate-600 border border-slate-300 hover:bg-slate-100 transition-colors"
                >
                    Cancel
                </button>
                <button
                    onClick={() => {
                        onConfirm();
                        closeModal();
                    }}
                    className="px-6 py-2 bg-red-500 text-white rounded-lg shadow-md hover:bg-red-600 transition-colors"
                >
                    Delete
                </button>
            </div>
        </div>
    );

    const Modal = ({ children }) => (
        <div className="fixed inset-0 bg-slate-900 bg-opacity-75 flex items-center justify-center p-4 z-50">
            <div className="relative bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6">
                <button onClick={closeModal} className="absolute top-4 right-4 text-slate-400 hover:text-slate-600">
                    <X size={24} />
                </button>
                {children}
            </div>
        </div>
    );

    const LoginPanel = () => {
        const [username, setUsername] = useState('');
        const [password, setPassword] = useState('');

        const handleSubmit = (e) => {
            e.preventDefault();
            handleLogin(username, password);
        };

        return (
            <div className="flex flex-col items-center justify-center min-h-screen bg-slate-100">
                <div className="bg-white p-10 rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md">
                    <h2 className="text-3xl font-bold text-center text-slate-800 mb-6">Admin Login</h2>
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Username</label>
                            <input
                                type="text"
                                placeholder="Enter username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-slate-600 mb-1">Password</label>
                            <input
                                type="password"
                                placeholder="Enter password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-3 rounded-lg border border-slate-300 focus:outline-none focus:ring-2 focus:ring-green-500 transition-shadow"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full px-4 py-3 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 transition-colors font-semibold"
                        >
                            Log In
                        </button>
                    </form>
                </div>
            </div>
        );
    };

    const renderContent = () => {
        if (!isLoggedIn) {
            return <LoginPanel />;
        }
        
        if (isLoading) {
            return (
                <div className="flex justify-center items-center h-screen bg-slate-50">
                    <div className="text-slate-600">Loading...</div>
                </div>
            );
        }

        switch (currentPage) {
            case 'dashboard':
                return <DashboardSection />;
            case 'projects':
                return <ProjectsSection />;
            case 'skills':
                return <SkillsSection />;
            case 'settings':
                return <SettingsSection />;
            default:
                return <DashboardSection />;
        }
    };

    return (
        <div className="flex min-h-screen font-sans bg-slate-100">
            {isLoggedIn ? <SideNav /> : null}
            <main className="flex-1 overflow-y-auto">
                {renderContent()}
            </main>
            {showModal && <Modal>{modalContent}</Modal>}
            {message && (
                <div className="fixed bottom-4 right-4 bg-slate-800 text-white px-4 py-2 rounded-lg shadow-xl z-50 transition-transform duration-300 transform slide-in-from-bottom">
                    {message}
                </div>
            )}
        </div>
    );
};

export default App;