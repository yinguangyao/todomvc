/* author: gyyin
 * 需要先引入redux
 * connect需要在provider的回调函数里面使用
*/
(function() {
    const root = this;
    const shallowEqual = (objA, objB) => {
        let nativeKeys = Object.keys,
            isShallowEqual = true;
        if (objA === objB) return true;
        nativeKeys(objA).map((item, key) => {
            if(!objB[key]) {
                isShallowEqual = false;
            }
            if (item !== objB[key]) {
                isShallowEqual = false;
            }
        })
        return isShallowEqual;
    }
    const provider = (store, callback) => {
        callback;
    }
    const connect = (mapStateToProps, mapDispatchToProps) => 
        (component) => {
            let oldProps;
            let render = () => {
                const props = Object.assign({}, mapStateToProps(store), mapDispatchToProps(store));
                if (shallowEqual(props, oldProps)) return;
                oldProps = props;
                component(props);
            }
            store.subscribe(render);
            return render;
        }
    root.jqueryRedux = {
        provider,
        connect
    }
}.call(this))