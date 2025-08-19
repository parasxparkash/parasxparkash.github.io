---
layout: post
title: "Modern React Patterns and Performance"
date: 2024-01-10
categories: [blog, frontend]
tags: [react, javascript, performance, patterns]
author: Paras Parkash
reading_time: 6
description: "Exploring advanced React patterns including render props, compound components, and custom hooks. Learn how to optimize performance with React.memo, useMemo, and useCallback."
---

# Modern React Patterns and Performance

React has evolved significantly since its introduction, bringing new patterns and performance optimizations. In this post, we'll explore modern React patterns and techniques to build efficient, maintainable applications.

## Advanced React Patterns

### 1. Compound Components

Compound components allow you to create flexible, reusable components with implicit state sharing:

```jsx
// Modal compound component
const Modal = ({ children, isOpen, onClose }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
};

Modal.Header = ({ children }) => (
  <div className="modal-header">{children}</div>
);

Modal.Body = ({ children }) => (
  <div className="modal-body">{children}</div>
);

Modal.Footer = ({ children }) => (
  <div className="modal-footer">{children}</div>
);

// Usage
const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  
  return (
    <Modal isOpen={isOpen} onClose={() => setIsOpen(false)}>
      <Modal.Header>
        <h2>Confirmation</h2>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete this item?</p>
      </Modal.Body>
      <Modal.Footer>
        <button onClick={() => setIsOpen(false)}>Cancel</button>
        <button onClick={handleDelete}>Delete</button>
      </Modal.Footer>
    </Modal>
  );
};
```

### 2. Render Props Pattern

Render props provide a way to share code between components using a prop whose value is a function:

```jsx
const DataFetcher = ({ url, render }) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);
  
  return render({ data, loading, error });
};

// Usage
const UserProfile = () => (
  <DataFetcher
    url="/api/user/profile"
    render={({ data, loading, error }) => {
      if (loading) return <div>Loading...</div>;
      if (error) return <div>Error: {error.message}</div>;
      return <div>Welcome, {data.name}!</div>;
    }}
  />
);
```

### 3. Custom Hooks

Custom hooks let you extract component logic into reusable functions:

```jsx
// Custom hook for API calls
const useApi = (url) => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const refetch = useCallback(() => {
    setLoading(true);
    setError(null);
    
    fetch(url)
      .then(response => response.json())
      .then(data => {
        setData(data);
        setLoading(false);
      })
      .catch(error => {
        setError(error);
        setLoading(false);
      });
  }, [url]);
  
  useEffect(() => {
    refetch();
  }, [refetch]);
  
  return { data, loading, error, refetch };
};

// Custom hook for local storage
const useLocalStorage = (key, initialValue) => {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error reading localStorage key "${key}":`, error);
      return initialValue;
    }
  });
  
  const setValue = useCallback((value) => {
    try {
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, storedValue]);
  
  return [storedValue, setValue];
};
```

## Performance Optimization

### 1. React.memo

Prevent unnecessary re-renders with React.memo:

```jsx
const ExpensiveComponent = React.memo(({ data, onUpdate }) => {
  console.log('ExpensiveComponent rendered');
  
  return (
    <div>
      {data.map(item => (
        <div key={item.id} onClick={() => onUpdate(item.id)}>
          {item.name}
        </div>
      ))}
    </div>
  );
});

// Custom comparison function
const areEqual = (prevProps, nextProps) => {
  return prevProps.data.length === nextProps.data.length &&
         prevProps.data.every((item, index) => 
           item.id === nextProps.data[index].id
         );
};

const OptimizedComponent = React.memo(ExpensiveComponent, areEqual);
```

### 2. useMemo Hook

Memoize expensive calculations:

```jsx
const DataProcessor = ({ items, filter }) => {
  const processedData = useMemo(() => {
    console.log('Processing data...');
    return items
      .filter(item => item.category === filter)
      .sort((a, b) => a.name.localeCompare(b.name))
      .map(item => ({
        ...item,
        displayName: `${item.name} (${item.category})`
      }));
  }, [items, filter]);
  
  const stats = useMemo(() => {
    return {
      total: processedData.length,
      categories: [...new Set(processedData.map(item => item.category))]
    };
  }, [processedData]);
  
  return (
    <div>
      <div>Total items: {stats.total}</div>
      <div>Categories: {stats.categories.join(', ')}</div>
      {processedData.map(item => (
        <div key={item.id}>{item.displayName}</div>
      ))}
    </div>
  );
};
```

### 3. useCallback Hook

Memoize functions to prevent child re-renders:

```jsx
const TodoList = ({ todos, onToggle, onDelete }) => {
  const [filter, setFilter] = useState('all');
  
  const filteredTodos = useMemo(() => {
    switch (filter) {
      case 'active':
        return todos.filter(todo => !todo.completed);
      case 'completed':
        return todos.filter(todo => todo.completed);
      default:
        return todos;
    }
  }, [todos, filter]);
  
  const handleToggle = useCallback((id) => {
    onToggle(id);
  }, [onToggle]);
  
  const handleDelete = useCallback((id) => {
    onDelete(id);
  }, [onDelete]);
  
  return (
    <div>
      <div>
        <button 
          onClick={() => setFilter('all')}
          className={filter === 'all' ? 'active' : ''}
        >
          All
        </button>
        <button 
          onClick={() => setFilter('active')}
          className={filter === 'active' ? 'active' : ''}
        >
          Active
        </button>
        <button 
          onClick={() => setFilter('completed')}
          className={filter === 'completed' ? 'active' : ''}
        >
          Completed
        </button>
      </div>
      
      {filteredTodos.map(todo => (
        <TodoItem
          key={todo.id}
          todo={todo}
          onToggle={handleToggle}
          onDelete={handleDelete}
        />
      ))}
    </div>
  );
};

const TodoItem = React.memo(({ todo, onToggle, onDelete }) => {
  return (
    <div className={`todo-item ${todo.completed ? 'completed' : ''}`}>
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={() => onToggle(todo.id)}
      />
      <span>{todo.text}</span>
      <button onClick={() => onDelete(todo.id)}>Delete</button>
    </div>
  );
});
```

### 4. Code Splitting with React.lazy

Split your code to reduce initial bundle size:

```jsx
import { Suspense, lazy } from 'react';

const LazyComponent = lazy(() => import('./LazyComponent'));
const AnotherLazyComponent = lazy(() => 
  import('./AnotherComponent').then(module => ({
    default: module.AnotherComponent
  }))
);

const App = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <LazyComponent />
      </Suspense>
      
      <Suspense fallback={<div>Loading another component...</div>}>
        <AnotherLazyComponent />
      </Suspense>
    </div>
  );
};
```

## Advanced Patterns

### Error Boundaries

Handle errors gracefully in your component tree:

```jsx
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null };
  }
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    this.setState({
      error: error,
      errorInfo: errorInfo
    });
    
    // Log error to monitoring service
    console.error('Error caught by boundary:', error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="error-boundary">
          <h2>Something went wrong.</h2>
          <details style={% raw %}{{ whiteSpace: 'pre-wrap' }}{% endraw %}>
            {this.state.error && this.state.error.toString()}
            <br />
            {this.state.errorInfo.componentStack}
          </details>
        </div>
      );
    }
    
    return this.props.children;
  }
}

// Usage
const App = () => (
  <ErrorBoundary>
    <Header />
    <Main />
    <Footer />
  </ErrorBoundary>
);
```

### Higher-Order Components (HOCs)

Create reusable component logic:

```jsx
const withAuth = (WrappedComponent) => {
  return (props) => {
    const { user, loading } = useAuth();
    
    if (loading) {
      return <div>Loading...</div>;
    }
    
    if (!user) {
      return <div>Please log in to access this page.</div>;
    }
    
    return <WrappedComponent {...props} user={user} />;
  };
};

const withLoading = (WrappedComponent) => {
  return ({ isLoading, ...props }) => {
    if (isLoading) {
      return <div>Loading...</div>;
    }
    
    return <WrappedComponent {...props} />;
  };
};

// Usage
const Dashboard = withAuth(withLoading(({ user }) => (
  <div>
    <h1>Welcome, {user.name}!</h1>
    {/* Dashboard content */}
  </div>
)));
```

## Best Practices

1. **Keep components small and focused**: Each component should have a single responsibility
2. **Use TypeScript**: Add type safety to catch errors early
3. **Implement proper error handling**: Use error boundaries and proper error states
4. **Optimize bundle size**: Use code splitting and tree shaking
5. **Profile your app**: Use React DevTools Profiler to identify performance bottlenecks
6. **Follow the rules of hooks**: Only call hooks at the top level of components
7. **Use meaningful names**: Component and hook names should be descriptive

## Conclusion

Modern React development involves understanding and applying various patterns and optimization techniques. By leveraging compound components, custom hooks, and performance optimizations like memoization, you can build applications that are both maintainable and performant.

Remember that premature optimization can be counterproductive. Always measure first, then optimize based on actual performance bottlenecks rather than assumptions.

---

*Interested in more React content? Check out my posts on [React Testing](/tags/testing) and [State Management](/tags/state-management).*
