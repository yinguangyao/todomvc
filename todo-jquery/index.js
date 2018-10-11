// 操作DOM的方式
$(function() {
    const $input = $(".new-todo"),
        $todoList = $(".todo-list"),
        $close = $(".destroy"),
        $count = $(".todo-count"),
        $filters = $(".filters"),
        $clearComplete = $(".clear-completed");
    let activeCount = 0;
    // 筛选
    const showAll = () => {
        $todoList.find("li").css("display", "block");
    }

    const showActive = () => {
        const $todos = $todoList.find("li");
        $todos.each(function() {
            if ($(this).hasClass("completed")) {
                $(this).css("display", "none");
            } else {
                $(this).css("display", "block");
            }
        })
    }

    const showCompleted = () => {
        const $todos = $todoList.find("li");
        $todos.each(function() {
            if ($(this).hasClass("completed")) {
                $(this).css("display", "block");
            } else {
                $(this).css("display", "none");
            }
        })
    }

    const filterHandler = {
        "All": showAll,
        "Active": showActive,
        "Completed": showCompleted
    }

    const filterToDo = (filter) => {
        filterHandler[filter] && filterHandler[filter]();
    }
    // 添加、删除todo选项
    const addToDo = (text) => {
        const $todo = `<li class=""><input type="checkbox" class="toggle" readonly="" value="false"><label>${text}</label><button class="destroy"></button><input class="edit" value="" style="display: none;"></li>`;
        $todoList.append($todo);
    }

    const removeToDo = ($li) => {
        $li.remove();
    }
    // 修改数量展示
    const renderCount = () => {
        $count.text(`${activeCount} items left`);
    }
    // 清除输入框
    const clearInput = () => {
        $input.val("");
    }
    // 修改filter的选中状态
    const changeFilterStatus = (target) => {
        const $siblings = $(target).siblings("a");
        $siblings.each(function() {
            $(this).removeClass("selected");
        })
        $(target).addClass("selected");
    }
    // 清除completed的选项
    const clearCompleted = () => {
        const $todos = $todoList.find("li");
        $todos.each(function() {
            if ($(this).hasClass("completed")) {
                $(this).find(".toggle").click();
                $(this).removeClass("completed");
            }
        })
    }
    // 事件
    $input.on("keyup", function(event) {
        if (event.keyCode !== 13) {
            return;
        }  
        let text = $(this).val();
        
        clearInput();
        addToDo(text);
        activeCount++;
        renderCount();
    });

    $todoList.on("click", "input", function(e) {
        const target = e.target;
        $(target).closest("li").toggleClass("completed");
    })

    $todoList.on("click", ".destroy", function(e) {
        const target = e.target,
            $li = $(target).closest("li");
        removeToDo($li);
        activeCount--;
        renderCount();
    })

    $filters.on("click", "a", function(e) {
        const target = e.target;
        if ($(target).hasClass("selected")) {
            return;
        }
        changeFilterStatus(target);
        filterToDo(target.innerText);
    })
    $clearComplete.on("click", function() {
        clearCompleted();
    })
})
