// ★STEP2
// https://jp.vuejs.org/v2/examples/todomvc.html
var STORAGE_KEY = 'todos-vuejs-demo'
var todoStorage = {
  fetch: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    todoStorage.uid = todos.length
    return todos
  },
  save: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}


// ★STEP1
var app = new Vue({
  el: '#app',

  data: {
    // ★STEP5 localStorage から 取得した ToDo のリスト
    todos: [],
    // ★STEP11 抽出しているToDoの状態
    current: 0,
    // ★STEP11＆STEP13 各状態のラベル
    keyword: "",
    tickets: [],
    devices: [],
    materials:[],
    options: [
      { value: -1, label: 'すべて' },
      { value: 0 , label: '作成中' },
      { value: 1, label: '作成済' }
    ]
  },

  computed: {

    // ★STEP12
    computedTodos: function () {
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)
    },
    computedTiketSum: function () {
      sum = 0;
      target = this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this)//.map(x => x.comment.ticket.map(el =>{ sum += el }))

      for(i = 0; i < target.length;i++){
        console.log(target[i].comment);
        this.tickets.forEach( function(e){
          array = e.split('-');
          console.log(e.split('-'));
          if( array[0] == target[i].id) {
            console.log(target[i].comment.ticket[[array[1]]]);
            sum += target[i].comment.ticket[[array[1]]];
          }
        })
      }
      console.log(sum);
      return sum;

    },
    computedOrbit: function () {
      return null
      // var sum = 0
      // this.tickets.forEach( el =>{
      //     sum += Number(document.getElementById(el).textContent);
      // });
      // return Math.ceil(this.todos.filter(function (el) {
      //   return this.current < 0 ? true : this.current === el.state
      // }, this).map(x => x.comment.ticket).reduce((a,x) => a+=x,0)/327);
    },
    computedMiraCost: function () {
      return this.todos.filter(function (el) {
        return this.current < 0 ? true : this.current === el.state
      }, this).map(x => x.comment.cost).reduce((a,x) => a+=x,0);
    },

    // ★STEP13 作業中・完了のラベルを表示する
    labels() {
      return this.options.reduce(function (a, b) {
        return Object.assign(a, { [b.value]: b.label })
      }, {})
      // キーから見つけやすいように、次のように加工したデータを作成
      // {0: '作業中', 1: '完了', -1: 'すべて'}
    },
    filteredDevices: function () {
      var devices = [];
      // 2文字以上入力されてたらDOM操作開始
      if(this.keyword.length > 1) {
        for(var i in this.devices) {
            var device = this.devices[i];
            // if(device.device.includes(this.keyword) !== -1) {
              if(device.device.match(new RegExp(this.keyword))) {
                devices.push(device);
            }
        }
      }
      return devices;
    }
  },

  // ★STEP8
  watch: {
    // オプションを使う場合はオブジェクト形式にする
    todos: {
      // 引数はウォッチしているプロパティの変更後の値
      handler: function (todos) {
        todoStorage.save(todos)
      },
      // deep オプションでネストしているデータも監視できる
      deep: true
    }
  },

  // ★STEP9
  created() {
    // インスタンス作成時に自動的に fetch() する
    this.todos = todoStorage.fetch()
  },

  methods: {

    // ★STEP7 ToDo 追加の処理
    doAdd: function(device,value) {
      // { 新しいID, コメント, 作業状態 }
      // というオブジェクトを現在の todos リストへ push
      // 作業状態「state」はデフォルト「作業中=0」で作成
      value.ticket = [];
      for( i = 0; i < value.materials.length; i++ ) {
        value.ticket[i] = this.materials[value.materials[i]].ticket * value.material_num[i];
      }
      value.ticket_def = value.ticket;

      this.todos.push({
        id: todoStorage.uid++,
        device: device,
        comment: value,
        state: 0
      })
    },
    addTiket: function(value,check) {
      
    },

    // ★STEP10 状態変更の処理
    doChangeState: function (item) {
      item.state = !item.state ? 1 : 0
    },

    // ★STEP10 削除の処理
    doRemove: function (item) {
      var index = this.todos.indexOf(item)
      this.todos.splice(index, 1)
    }
    
  },
  mounted: function() {
    var self = this;
    axios
        .get('./device.json')
        .then(function(response) {
            self.devices = response.data.devices;
        })
        .catch(function(error) {
            console.log('取得に失敗しました。', error);
        })

      axios
        .get('./material.json')
        .then(function(response) {
            self.materials = response.data;
        })
        .catch(function(error) {
            console.log('取得に失敗しました。', error);
        })
    }
})