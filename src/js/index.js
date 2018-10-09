$(function() {
    var wrap = new BScroll('.wrap', {
        click: true
    });
    $.ajax({
        url: '../data/data.json',
        // dataType: 'json',
        success: function(res) {
            render(res.data)
        }

    })

    function render(data) {
        var obj = {};
        data.forEach(function(item) {
            var first = item.Spelling.substr(0, 1);
            if (!obj[first]) {
                obj[first] = {
                    title: first,
                    list: []
                };
            }
            obj[first].list.push(item);
        })
        var arr = [];
        for (var i in obj) {
            arr.push(obj[i])
        }


        arr.sort(function(a, b) {
            return a.title.charCodeAt(0) - b.title.charCodeAt(0)
        })
        var str = '';
        var navStr = '';
        arr.forEach(function(item) {
            str += ` <li>
                <h2>${item.title}</h2>
                <ol>`;
            item.list.forEach(function(v) {
                str += `<li>${v.Name}</li>`
            })
            str += ` </ol></li>`;
            navStr += `<li>${item.title}</li>`
        });
        $('.list').append(str)
        $('.nav-list').append(navStr)
    }

    $('.nav-list').on('click', 'li', function() {
        // alert(888)
        var index = $(this).index();
        // console.log(index)

        wrap.scrollToElement($('.list>li').eq(index)[0]);
        // console.log($('.wrap'))
    })
})