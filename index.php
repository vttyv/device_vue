<?php include_once("index.html"); ?>
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <title>XenobladeXデバイスリスト</title>
  <link rel="stylesheet" href="./main.css">
</head>
<body>

  <div id="app">
    <h1>XenobladeXデバイスリスト</h1>

    <!-- ★STEP11 -->
    <label v-for="label in options" >
      <input type="radio"
        v-model="current"
        v-bind:value="label.value">{{ label.label }}
    </label>
      
    <!-- ★STEP12 -->
    <span>
    （{{ computedTodos.length }} 件を表示）<br>
    チケット必要枚数:{{ computedTiketSum }},ミラニウム:{{computedMiraCost}}
    </span><br>
    <span>端末を{{ computedOrbit }}周しましょう</span>
    <!-- ★STEP4 リスト用テーブル -->
    <table>
      <thead v-pre>
        <tr>
          <th class="comment">デバイス</th>
          <th class="state">状態</th>
        </tr>
      </thead>
      <tbody>
        <!-- ★STEP5 ToDo の要素をループ -->
        <tr
          v-for="item in computedTodos"
          v-bind:key="item.id"
          v-bind:id="'item-'+item.id"
          v-bind:class="{done:item.state}">
          <td>
            <p>{{item.device}}{{item.comment.rank}} {{item.comment.tips}}</p>
              <p v-for="(mt, index) in item.comment.materials">
                  <span v-text="mt"></span>
                  <span v-text="item.comment.material_num[index]"></span>
                  <span> チケット:</span>
                  <label v-if="materials[mt]" :id="'ticket-'+item.id+'+'+index"><input type="checkbox" v-bind:value="item.id+'-'+index" v-model="tickets">{{item.comment.ticket[index]}}</label><br>
                  <span v-if="materials[mt]">{{materials[mt].info}}</span>
              </p>
                <!-- <span v-text="materials[mt]"></span> -->
            <p>
              <span v-text="item.comment.rsrc"></span>
              <span> </span>

              <span v-text="item.comment.rsrc_num"></span>
              <span> ミラニウム:</span>
              <span id="mira-cost" v-text="item.comment.cost"></span>
              <span> 累計枚数:</span>
              
            </p>
          </td>
          <td class="state">
            <!-- ★STEP10 状態変更ボタン -->
            <button v-on:click="doChangeState(item)">
              {{ labels[item.state] }}
            </button>

            <!-- ★STEP10 削除ボタン -->
            <button v-on:click.alt="doRemove(item)">
              削除
            </button>
          </td>
        </tr>
      </tbody>
    </table>
    <p>※削除ボタンはaltキーを押しながらクリックして下さい</p>

    <!-- ★STEP6 -->
    <h2>新しいデバイスの追加</h2>
    
      <form class="add-form" v-on:submit.prevent="doAdd">
        <!-- コメント入力フォーム -->
          <label for="">デバイス名
            <input type="search" list="devices" v-model="keyword" placeholder="デバイス名を入力" autocomplete="on" >
            <datalist id="devices">
              <option v-for="item in devices" v-bind:value=item.device v-bind:label=item.type[0].tips >{{item.device}}</option>
            </datalist>
          </label>
          <input type="text" name="dummy" style="display:none;">
          <!-- 追加ボタンのモック -->
          <p></p>
          <div v-for="device in filteredDevices" style="padding-top: 20px;">
            <div v-for="item in device.type">
              <p>
                <span ref="comment" v-text="device.device+item.rank"></span>
                <input type="button" v-on:click="doAdd(device.device,item)" value="追加"> 
                <span v-text="item.tips"></span>
              </p>
              <p>
                <span v-for="(mt, index) in item.materials">
                  <span v-text="mt"></span>
                  <span v-text="item.material_num[index]"></span>
                  <span> </span>
                </span>
              </p>
              <p>
                <span v-text="item.rsrc"></span>
                <span> </span>

                <span v-text="item.rsrc_num"></span>
                <span> </span>
              </p>
              
              <p><br></p>
            </div>
          </div>
          <!-- <button type="submit">追加</button> -->
          <input type="button" onclick="submit();" value="送信" style="display:none;" />
      </form>
  </div>

  <script src="https://cdn.jsdelivr.net/npm/vue"></script>
  <script src="https://cdn.jsdelivr.net/npm/axios/dist/axios.min.js"></script>
  <script src="./main.js"></script>
  <script src="./search.js"></script>
</body>
</html>