import React, {useState} from "react";
import { Plus, X } from 'lucide-react';

interface Task {
    id: string;
    text: string;
    completed: boolean;
}

export const TodoList: React.FC = () => {

    const [tasks, setTasks] = useState<Task[]>([
        
    ]);
    const [newTaskText, setNewTaskText] = useState('');


    const addTask = () => {
        if (newTaskText.trim() === '') {
            alert("Please enter a task before adding.");
            return;
        }
            
        const newTask: Task = {
        id: Date.now().toString(),
        text: newTaskText.trim(),
        completed: false,
        };
        
        setTasks([...tasks, newTask]); //like storing data in JSON
        setNewTaskText('');
    };

    const toggleTask = (id: string) => {
        const updateTask = (task: Task) =>
            task.id === id ? { ...task, completed: !task.completed } : task;

        setTasks(tasks.map(updateTask)); //to show changes
    };

    const deleteTask = (id: string) => {
        setTasks(tasks.filter((task) => task.id !== id));   
    };


    {/*UI*/}
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="max-w-md mx-auto bg-white p-6 rounded-lg shadow-lg">
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Your To Do</h1>
                
                {/* Add new task input */}
                <div className="flex items-center mb-6 gap-3">
                    <input
                    type="text"
                    value={newTaskText}
                    onChange={(e) => setNewTaskText(e.target.value)}
                    placeholder="Add new task"
                    className="flex-1 px-3 py-2 border-b border-gray-300 focus:border-gray-500 outline-none text-gray-700 placeholder-gray-400"
                    />
                    <button
                    onClick={addTask}
                    className="w-8 h-8 bg-gray-800 hover:bg-gray-700 text-white rounded-full flex items-center justify-center transition-colors"
                    >
                    <Plus size={16} />
                    </button>
                </div>

                {/* Task list */}
                <div className="space-y-3 mb-6">
                    {tasks.map((task) => (
                <div
                    key={task.id}
                    className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
                >
                    <label className="flex items-center gap-3 flex-1 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => toggleTask(task.id)} 
                        className="w-5 h-5 text-gray-600 bg-white border-2 border-gray-300 rounded focus:ring-gray-500 focus:ring-2"
                    />
                    <span
                        className={`flex-1 text-sm ${
                        task.completed
                            ? 'text-gray-500 line-through'
                            : 'text-gray-700'
                        }`}
                    >
                        {task.text}
                    </span>
                    </label>
                    <button
                    className="text-gray-400 hover:text-gray-600 transition-colors"
                        onClick={() => deleteTask(task.id)}
                    >
                    <X size={16} />
                    </button>
                </div>
                ))}
                </div>

                {/* Footer */}
                <div className="text-left-align">
                    <p className="text-sm text-gray-600 mb-2">
                        Your remaining todos: {tasks.filter(task => !task.completed).length}
                    </p>
                    <p className="text-xs text-gray-400 italic">
                    "Doing what you love is the cornerstone of having abundance in your life." - Wayne Dyer
                    </p>
                </div>
            </div>
        </div>
    );
};