/// 这里需要对参数为0或1的情况进行判断
(function(exports) {
    const _compose = (...funcs) => {
        if (!funcs) {
            return args => args;
        }
        if (funcs.length === 1) {
            return funcs[0];
        }
        return funcs.reduce((f1, f2) => (...args) => f1(f2(...args)));
    };

    const bindActionCreator = (action, dispatch) => {
        return (...args) => dispatch(action(...args));
    };

    const createStore = (reducer, initState = {}) => {
        let store = initState, 
            listeners = [],
            isDispatch = false;
        const getState = () => store;
        const dispatch = (action) => {
            let isChange = false,
                isDispatch,
                storeInfo;
            if (isDispatch) return action;
            // dispatch必须一个个来
            isDispatch = true;
            storeInfo = reducer(store, action);
            store = storeInfo.store;
            isChanged = storeInfo.isChanged;
            isDispatch = false;
            if(isChanged) {
                listeners.forEach(listener => listener());
            }
            return action;
        }
        const subscribe = (listener) => {
            if (typeof listener === "function") {
                listeners.push(listener);
            }
            return () => unsubscribe(listener);
        }
        const unsubscribe = (listener) => {
            const index = listeners.indexOf(listener);
            listeners.splice(index, 1);
        }
        return {
            getState,
            dispatch,
            subscribe,
            unsubscribe
        };
    };

    const applyMiddleware = (...middlewares) => {
        return (createStore) => (reducer, initState, enhancer) => {
            const store = createStore(reducer, initState, enhancer);
            let chain = middlewares.map(middleware => middleware(store));
            store.dispatch = _compose(...chain)(store.dispatch);
            return {
            ...store
            };
        }
    };

    const combineReducers = reducers => {
        const finalReducers = {},
            nativeKeys = Object.keys;
        nativeKeys(reducers).forEach(reducerKey => {
            if(typeof reducers[reducerKey] === "function") {
                finalReducers[reducerKey] = reducers[reducerKey];
            }
        });
        return (state, action) => {
            let store = {},
                isChanged = false;
            nativeKeys(finalReducers).forEach(key => {
                const reducer = finalReducers[key];
                const nextState = reducer(state[key], action);
                if (nextState !== store[key]) {
                    isChanged = true;
                }
                store[key] = nextState;
            })
            return {
                store,
                isChange
            }
        }
    };
    exports.Redux = {
        createStore,
        bindActionCreator,
        combineReducers,
        applyMiddleware
    }
}(this))