console.log('ok')
let tbody = document.getElementById('stu-tbody')

function del(stuno) {
    console.log(stuno)
    $.ajax({
        url: `/delStu?no=${stuno}`,
    }).then(res => {
        console.log(res);
        if (res.message == 'succers') {
            alert('刪除成功！');
            stuInfo();
        }
    })

}

function edit(eve) {
    console.log(eve)
    let tds = $(eve.target).parent().siblings()
    let oldSno = tds[0].innerText
    console.log(oldSno)
    if ($(eve.target).text() == '編輯') {
        tds.attr('contenteditable', true)
        $(eve.target).text('保存')
        return
    }
    if ($(eve.target).text() == '保存') {
        params = {
            Sno: oldSno,
            sname: tds[1].innerText,
            ssex: tds[2].innerText,
            syear: tds[3].innerText,
            sclass: tds[4].innerText,
        }
        $.ajax({
            url: '/editStu',
            data: $.param(params)
        }).then(res => {
            console.log(res);
            if (res.message == 'succers') {
                alert('修改成功！');
                stuInfo();
            }
        })

        $(eve.target).text('編輯')
        return
    }

}

function stuInfo() {
    tbody.innerHTML = ''
    $.get('/getStuInfo').then(res => {
        let data = res.data;
        console.log(data);

        for (let i = 0; i < data.length; i++) {
            let tr = document.createElement('tr')
            let td = []
            for (let j = 0; j < 6; j++) {
                td[j] = document.createElement('td')
            }
            let no = document.createTextNode(data[i].no)
            let name = document.createTextNode(data[i].name)
            let sex = document.createTextNode(data[i].sex)
            let year = document.createTextNode(data[i].year)
            let s_class = document.createTextNode(data[i].class)

            td[0].appendChild(no)
            td[1].appendChild(name)
            td[2].appendChild(sex)
            td[3].appendChild(year)
            td[4].appendChild(s_class)
            td[5].innerHTML = `<a href='javascript:void(0)' onclick='edit(event)'>編輯</a>&nbsp;&nbsp;&nbsp;&nbsp;\
                               <a href='javascript:void(0)' onclick='del("${data[i].no}")'>刪除</a>`

            for (let j = 0; j < 6; j++) {
                tr.appendChild(td[j])
            }

            tbody.appendChild(tr)
        }

    })
}
stuInfo();

$('#add-stu').click(function () {
    $.ajax({
        url: '/addStu',
        data: $('form').serialize()
    }).then(res => {
        console.log(res);
        if (res.message == 'succers') {
            alert('添加成功！');
            stuInfo();
        }
    })
})