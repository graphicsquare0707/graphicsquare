



	    let points = 0;//きりたんぽいんと　初期値100
   	    let points02 = 0;//きりたんのもと　初期値50
		
		let points02flag = 0;
		let startFlag =0;//作業開始中の判断フラグ　0=停止　1=開始
		
		let tapCount = 0 ;//変数　タップ回数をカウント
		let tapCount02 = 0 ;//変数　タップ回数をカウント
		let tapCount03 = 0 ;//変数　タップ回数をカウント

        let startTime;
        let interval;
        let totalTime = 0;


		const currentDate = new Date().toLocaleDateString('ja-JP');//日付データ取得
		

	    //HTMLタグを操作するためのIDの紐づけ設定　タグ情報を取得
	    
        const timerDisplay = document.getElementById('timer');
        const startButton = document.getElementById('start');
        const stopButton = document.getElementById('stop');
        const saveButton = document.getElementById('save');
        const loadButton = document.getElementById('load');
        const exportButton = document.getElementById('export');

        const dataPointxt01 = document.getElementById('pointxt');//<p>タグ内の情報取得
        const dataPointxt02 = document.getElementById('pointxt02');//<p>タグ内の情報取得

        const dataDiv01 = document.getElementById('data01');//<p>タグ内の情報取得
        const dataDiv = document.getElementById('data');//<div>タグ内の情報取得
        
        //音声ファイルの設定　ランダム再生用
        //関数も変更必須　playRandomAudio()　playEndRandomAudio()　playTapRandomAudio()　playTap03RandomAudio()
        const audioFiles = ["./music/start01.mp3" , "./music/start02.mp3" , "./music/start03.mp3" , "./music/start04.mp3" , "./music/start05.mp3"];
		const audioEndFiles = ["./music/end01.mp3" , "./music/end02.mp3"];
		const audioTapFiles = ["./music_se/tuttuku.mp3" , "./music_se/tuntun.mp3" , "./music_se/osawari.mp3" , "./music_se/tuttukunanimodenai.mp3" , "./music_se/tuntunsisugi.mp3" , "./music_se/tuntunkiritanpo.mp3", "./music_se/tuttukusagyousite.mp3"];
		const audioTap03Files = ["./music_se/tuttuiteasobuhentai.mp3"];
		const audioProfFiles = ["./music/login01_neruko.mp3" , "./music/login02_sabo.mp3"];


		//でかきりたんぽ　画像サイズ変更
		function changeImageWidth(points) {
 		var image = document.getElementById("kiritanpo");
		image.width = points;
			}

		//もと　きりたんぽ　画像サイズ変更
		function changeImageWidth02(points02) {
 		var image = document.getElementById("kiritanpo_moto");
		image.width = points02*1;//（倍率を指定中）
			}


		// 画像をクリックした時の処理
		document.getElementById("clickImage").addEventListener("click", function() {
	 		// 効果音のオーディオ要素を作成
			var seAudio = new Audio("./music_se/Motion-Pop04-1.mp3");
		
	  		// 効果音を再生
			  seAudio.play();
		  
			  tapCount += 1;//カウント加算　1タップ
		  	  tapCount03 += 1;//カウント加算　1タップ
		  
			if (tapCount == 10 ) {
				playTapRandomAudio();
				tapCount = 0;//初期化
			   }
			   
			if (tapCount03 == 55 ) {
				playTap03RandomAudio();
				tapCount03 = 5;//初期化
			   }

			//初回のみ流れる音声		  
			if (tapCount02 == 0 ) {
				playProfRandomAudio();
				tapCount02 = 1;//フラグ切り替え
			   }

		  
		});





		//処理の一旦停止　→　未使用　IOSで禁止
		function delay(ms) {
			return new Promise(resolve => setTimeout(resolve, ms));
			}

		async function myFunction() {
  			
			await delay(6000);	// 6秒間停止

			playAudio(); //オーディオタグで生成されたコンテンツの再生

			//タイマーの始動
	        startTime = Date.now() - (totalTime * 1000);
    	    interval = setInterval(updateTimer, 1000);
		}



		//再生　オーディオタグで生成されたコンテンツ
		function playAudio() {
			var audio = document.getElementById("myAudio");
			audio.play();
		}

		//停止　オーディオタグで生成されたコンテンツ
		function pauseAudio() {
			var audio = document.getElementById("myAudio");
			audio.pause();
		}


        // ①カウントダウンを開始
        startButton.addEventListener('click', () => {


			//もし停止中ならスタート　もしスタート中なら何も処理しない        
          if (startFlag == 0 ) {
        
	        startFlag = 1;//フラグ　スタート　1=開始
        
            playRandomAudio(); // ランダムな音声を再生

			//「１」IOSでは禁止処理　コメントアウトした
			//処理を待ち、その後オーディオを再生
            //myFunction();  
            
			//「２」そのまま再生する処理に書き換えた
			
			//オーディオタグで生成されたコンテンツの再生
			playAudio(); 

			//タイマーの始動
	        startTime = Date.now() - (totalTime * 1000);
    	    interval = setInterval(updateTimer, 1000);
            
          }
            
        });


        // ②カウントダウンを停止
        stopButton.addEventListener('click', () => {
        
		//もしスタート中ならカウントダウン停止の処理をする　　　もし既に停止中なら処理しない　        

          if (startFlag == 1 ) {

			//スタートフラグ　0=停止
			startFlag = 0;
        
            clearInterval(interval);
            const elapsedTime = Math.floor(totalTime);
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = elapsedTime % 60;
            dataDiv01.textContent = `　　作業時間は ${minutes} 分 ${seconds} 秒でした`;
            totalTime = 0;

			pauseAudio();//オーディオ停止
			playEndRandomAudio();//再生　終了音声

            // Web Storageにデータを保存
            saveData(minutes, seconds);
            
          }
          
        });



        // ランダムな音声を再生 　↓playRandomAudio()  audioFiles×2か所　の変更　＋変数の変更↑
        function playRandomAudio() {
            const randomIndex = Math.floor(Math.random() * audioFiles.length);
            const audio = new Audio(audioFiles[randomIndex]);
            audio.play();
        }
        
        // ランダムな終了音声を再生
        function playEndRandomAudio() {
            const randomIndex = Math.floor(Math.random() * audioEndFiles.length);
            const audio = new Audio(audioEndFiles[randomIndex]);
            audio.play();
        }
        
        // ランダムな終了音声を再生
        function playTapRandomAudio() {
            const randomIndex = Math.floor(Math.random() * audioTapFiles.length);
            const audio = new Audio(audioTapFiles[randomIndex]);
            audio.play();
		}
		
		// ランダムな終了音声を再生
        function playTap03RandomAudio() {
            const randomIndex = Math.floor(Math.random() * audioTap03Files.length);
            const audio = new Audio(audioTap03Files[randomIndex]);
            audio.play();
		}

		
        
        // ランダムな終了音声を再生
        function playProfRandomAudio() {
            const randomIndex = Math.floor(Math.random() * audioProfFiles.length);
            const audio = new Audio(audioProfFiles[randomIndex]);
            audio.play();
		}


        

        // 1秒ごとにタイマーを更新
        function updateTimer() {
            const currentTime = Date.now();
            const elapsedTime = (currentTime - startTime) / 1000;
            totalTime = elapsedTime;
            const minutes = Math.floor(elapsedTime / 60);
            const seconds = Math.floor(elapsedTime % 60);
            timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
        }



        // Web Storageにデータを保存
        function saveData(minutes, seconds) {
        
        
			
			//本日の日付を　ローカルストレージ用keyに代入
            const key = currentDate;
            
            //データ読み出し
            const storedData = localStorage.getItem(key);

			//データ判定　本日のデータに加算
            if (storedData) {
                const [storedMinutes, storedSeconds] = storedData.split(':').map(Number);
                minutes += storedMinutes;
                seconds += storedSeconds;
            }

            //データ保存
            localStorage.setItem(key,`${minutes}:${seconds}`);
            updateDataDisplay();
        }



        // Web Storageからデータを読み込み、表示
        function updateDataDisplay() {
        
            dataDiv.innerHTML = '';
            const keys = Object.keys(localStorage).sort((a, b) => {
                const dateA = new Date(a);
                const dateB = new Date(b);
                return dateB - dateA;
            });

			//初期化処理
			let points = 0;//初期化　きりたんぽいんと
			let points02 = 0;//初期化　きりたんのもと
			points02flag = 0;//初期化　フラグを変更


            keys.forEach((key) => {
                const [minutes, seconds] = localStorage.getItem(key).split(':').map(Number);
                const roundedMinutes = Math.round(minutes + seconds / 60);
                dataDiv.innerHTML += `<p>${key}: ${roundedMinutes} 分</p>`;
                
                points += roundedMinutes;//ポイント加算
                
                if ( key == currentDate ) {
				  // 条件が真の場合の処理
				  
				  points02 += roundedMinutes;
				  
				  //points02flag = 1;
				  //終了　フラグを変更
				  
				}
                
            });
            
                changeImageWidth(points);//きりたんぽの大きさ更新
				dataPointxt01.textContent = `総計「${points}きりたんぽいんと」なのです`;//ポイント表示
				
                changeImageWidth02(points02);//きりたんぽの大きさ更新
				dataPointxt02.textContent = `本日は「${points02}きりたんぽのもと」なのです`;//ポイント表示

        }

        // ページ読み込み時にデータを表示
        updateDataDisplay();
        
        




        // 保存データ出力ボタンのクリックイベント
        saveButton.addEventListener('click', () => {
            const dataToSave = JSON.stringify(localStorage);
            const blob = new Blob([dataToSave], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'work_data.json';
            a.click();
        });

        // 保存データ読み込みボタンのクリックイベント
        loadButton.addEventListener('click', () => {
            const input = document.createElement('input');
            input.type = 'file';
            input.accept = '.json';
            input.addEventListener('change', handleFileSelect);
            input.click();
        });

        // JSONファイルを読み込み、データを復元
        function handleFileSelect(event) {
            const file = event.target.files[0];
            const reader = new FileReader();
            reader.onload = function (e) {
                const data = JSON.parse(e.target.result);

                for (const key in data) {
                    localStorage.setItem(key,data[key]);

                }
                updateDataDisplay();
            };
            reader.readAsText(file);
        }
        
        
        // 保存データ出力＆データ削除
        exportButton.addEventListener('click', () => {
            const dataToExport = JSON.stringify(localStorage);
            const blob = new Blob([dataToExport], { type: 'application/json' });
            const url = URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'work_data.json';

            // ダウンロード処理
            a.click();

            // 保存データを削除
            localStorage.clear();
            
            // 画面の更新          
            updateDataDisplay();
        });        
        
        
        
