class Level_two extends Widget {
    constructor(specification, meta) {
        super(specification, meta);
    }

    initialize() {

        this.currentLevel = 2; 
        this.currentGroup = 0;

        this.currentletterIndex = 0; //this.getSavedProgress();

        this.viewWidth = 0;
        this.viewHeight = 0;

        this.letterview = null;
        this.brushLines = [];
        this.brushWidth = 50;

        this.preventDrawing = true;

        this.levelOnePixelData = null;

        this.checkpointGroupOrderIndexes = [];
        this.nextCheckpointIndex = 0;
        this.firstCheckpointInGroupWasHit = false;

        this.checkpointsRequestAnimationFrame = null;

        this.letterViewOffsetLeft;

        this.initialLoadDone = false;

        this.background = null;

        this.pentaScale = [];
        this.pentaScale.push(new Audio(core.getActiveWidget().path+'/assets/audio/penta_1.ogg'));
        this.pentaScale.push(new Audio(core.getActiveWidget().path+'/assets/audio/penta_2.ogg'));
        this.pentaScale.push(new Audio(core.getActiveWidget().path+'/assets/audio/penta_3.ogg'));
        this.pentaScale.push(new Audio(core.getActiveWidget().path+'/assets/audio/penta_4.ogg'));
        this.pentaScale.push(new Audio(core.getActiveWidget().path+'/assets/audio/penta_5.ogg'));
        this.pentaScale.push(new Audio(core.getActiveWidget().path+'/assets/audio/penta_6.ogg'));
        this.letter_win_sound = new Audio('www/addons/checheza.skin.official/assets/sounds/levelupYouDidIt.ogg');
        this.scaleCounter = 0;

        this.color_in_audio = new Audio(core.getActiveWidget().path+'/assets/audio/color_in.ogg');

        this.checkpoints = [
            {
                letter: 'a',
                groups: [[{"index":0,"x":"54.7096","y":"39.4700"},{"index":1,"x":"50.0785","y":"37.5174"},{"index":2,"x":"45.5259","y":"40.1674"},{"index":3,"x":"43.4851","y":"46.4435"},{"index":4,"x":"43.1711","y":"54.5328"},{"index":5,"x":"45.8399","y":"60.6695"},{"index":6,"x":"51.2559","y":"60.9484"},{"index":7,"x":"54.4741","y":"56.0669"}],[{"index":0,"x":"55.4945","y":"40.7252"},{"index":1,"x":"55.6515","y":"46.4435"},{"index":2,"x":"56.1224","y":"54.1144"},{"index":3,"x":"57.2214","y":"62.0642"}]],
                words: ['ant','axe','man'],
                sounds: ['sound_a_long.ogg','sound_a_short.ogg']
            },
            {
                letter: 'b',
                groups: [[{"index":0,"x":"43.9560","y":"23.7099"},{"index":1,"x":"43.7991","y":"30.9623"},{"index":2,"x":"43.9560","y":"38.3543"},{"index":3,"x":"44.0345","y":"46.0251"},{"index":4,"x":"44.1915","y":"53.5565"},{"index":5,"x":"44.5840","y":"61.0879"}],[{"index":0,"x":"45.4474","y":"50.6276"},{"index":1,"x":"47.3312","y":"44.2120"},{"index":2,"x":"51.0989","y":"41.7015"},{"index":3,"x":"54.4741","y":"45.4672"},{"index":4,"x":"56.3579","y":"52.5802"},{"index":5,"x":"54.9451","y":"59.6932"},{"index":6,"x":"50.9419","y":"63.0404"},{"index":7,"x":"46.3108","y":"60.9484"}]],
                words: ['bag','bed','box'],
                sounds: ['sound_b_long.ogg','sound_b_short.ogg']
            },
            {
                letter: 'c',
                groups: [[{"index":0,"x":"54.5526","y":"41.9805"},{"index":1,"x":"49.6860","y":"41.2831"},{"index":2,"x":"45.9184","y":"45.1883"},{"index":3,"x":"44.5055","y":"52.1618"},{"index":4,"x":"45.6829","y":"59.6932"},{"index":5,"x":"50.4710","y":"62.9010"},{"index":6,"x":"55.3375","y":"61.9247"}]],
                words: ['cup','cat','car'],
                sounds: ['sound_c_long.ogg','sound_c_short.ogg']
            },
            {
                letter: 'd',
                groups: [[{"index":0,"x":"53.7677","y":"41.1437"},{"index":1,"x":"48.8226","y":"41.5621"},{"index":2,"x":"45.3689","y":"47.1409"},{"index":3,"x":"44.8980","y":"55.3696"},{"index":4,"x":"47.5667","y":"61.9247"},{"index":5,"x":"51.8838","y":"60.5300"},{"index":6,"x":"53.9246","y":"54.2538"}],[{"index":0,"x":"54.5526","y":"23.5704"},{"index":1,"x":"54.4741","y":"31.9386"},{"index":2,"x":"54.7881","y":"40.4463"},{"index":3,"x":"55.1020","y":"47.8382"},{"index":4,"x":"55.2590","y":"55.0907"},{"index":5,"x":"55.4160","y":"62.4826"}]],
                words: ['dad','dig','dog'],
                sounds: ['sound_d_long.ogg','sound_d_short.ogg']
            },
            {
                letter: 'e',
                groups: [[{"index":0,"x":"45.7457","y":"49.2683"},{"index":1,"x":"51.0522","y":"46.9919"},{"index":2,"x":"51.6011","y":"38.8618"},{"index":3,"x":"46.6606","y":"38.2114"},{"index":4,"x":"44.1903","y":"45.5285"},{"index":5,"x":"44.8307","y":"55.1220"},{"index":6,"x":"49.5883","y":"62.7642"},{"index":7,"x":"55.0778","y":"58.2114"}]],
                words: ['ear','egg','end'],
                sounds: ['sound_e_long.ogg','sound_e_short.ogg']
            },
            {
                letter: 'f',
                groups: [[{"index":0,"x":"53.9726","y":"27.9805"},{"index":1,"x":"48.6301","y":"28.4672"},{"index":2,"x":"47.8082","y":"39.6594"},{"index":3,"x":"48.6301","y":"50.8516"},{"index":4,"x":"48.7671","y":"61.0706"}],[{"index":0,"x":"46.1644","y":"46.9586"},{"index":1,"x":"51.2329","y":"46.2287"}]],
                words: ['fan','far','fun'],
                sounds: ['sound_f_long.ogg','sound_f_short.ogg']
            },
            {
                letter: 'g',
                groups: [ [ {"index": 0, "x": "54.7131", "y": "41.5049" }, {"index": 1, "x": "49.5219", "y": "41.2621" }, {"index": 2, "x": "46.1066", "y": "46.4806" }, {"index": 3, "x": "44.8770", "y": "55.7039" }, {"index": 4, "x": "46.9945", "y": "62.7427" }, {"index": 5, "x": "51.7077", "y": "61.5291" }, {"index": 6, "x": "54.5765", "y": "55.3398" }, {"index": 7, "x": "55.1230", "y": "48.0583" }], [ {"index": 0, "x": "55.1913", "y": "59.4660" }, {"index": 1, "x": "54.8497", "y": "67.8398" }, {"index": 2, "x": "53.4153", "y": "74.6359" }, {"index": 3, "x": "49.7268", "y": "76.4563" }, {"index": 4, "x": "45.5601", "y": "73.3010" }] ],
                words: ['gap','get','god'],
                sounds: ['sound_g_long.ogg','sound_g_short.ogg']
            },
            {
                letter: 'h',
                groups: [ [ {"index": 0, "x": "42.8962", "y": "21.7233" }, {"index": 1, "x": "43.2377", "y": "30.7039" }, {"index": 2, "x": "43.7842", "y": "40.4126" }, {"index": 3, "x": "44.2623", "y": "52.1845" }, {"index": 4, "x": "44.5355", "y": "61.8932" }], [ {"index": 0, "x": "45.7650", "y": "48.4223" }, {"index": 1, "x": "48.0191", "y": "41.3835" }, {"index": 2, "x": "52.5956", "y": "38.7136" }, {"index": 3, "x": "56.2158", "y": "44.6602" }, {"index": 4, "x": "57.3087", "y": "53.3981" }, {"index": 5, "x": "57.1721", "y": "62.2573" }] ],
                words: ['him','hot','hut'],
                sounds: ['sound_h_long.ogg','sound_h_short.ogg']
            }, 
            {
                letter: 'i',
                groups: [ [ {"index": 0, "x": "50.0683", "y": "37.8641" }, {"index": 1, "x": "50.1366", "y": "45.8738" }, {"index": 2, "x": "50.2732", "y": "53.6408" }, {"index": 3, "x": "50.4098", "y": "62.3786" }], [ {"index": 0, "x": "49.6585", "y": "27.7913" }] ],
                words: ['if','in','it'],
                sounds: ['sound_i_long.ogg','sound_i_short.ogg']
            },
            {
                letter: 'j',
                groups: [ [ {"index": 0, "x": "56.0109", "y": "33.7379" }, {"index": 1, "x": "56.0792", "y": "41.0194" }, {"index": 2, "x": "56.0792", "y": "47.9369" }, {"index": 3, "x": "56.2158", "y": "54.9757" }, {"index": 4, "x": "56.4208", "y": "62.8641" }, {"index": 5, "x": "56.3525", "y": "71.3592" }, {"index": 6, "x": "54.0984", "y": "77.6699" }, {"index": 7, "x": "50.0683", "y": "80.2184" }, {"index": 8, "x": "46.2432", "y": "78.2767" }, {"index": 9, "x": "43.5792", "y": "72.2087" }, {"index": 10, "x": "55.8743", "y": "24.1505" }] ],
                words: ['jet','job','joy'],
                sounds: ['sound_j_long.ogg','sound_j_short.ogg']
            },
            {
                letter: 'k',
                groups: [ [ {"index": 0, "x": "44.9454", "y": "21.2379" }, {"index": 1, "x": "45.0820", "y": "29.6117" }, {"index": 2, "x": "45.2869", "y": "37.6214" }, {"index": 3, "x": "45.6284", "y": "45.6311" }, {"index": 4, "x": "45.6967", "y": "54.0049" }, {"index": 5, "x": "46.1066", "y": "62.6214" }], [ {"index": 0, "x": "53.2104", "y": "33.3738" }, {"index": 1, "x": "52.0492", "y": "39.4417" }, {"index": 2, "x": "50.0000", "y": "45.0243" }, {"index": 3, "x": "47.2678", "y": "47.2087" }], [ {"index": 0, "x": "51.3661", "y": "48.1796" }, {"index": 1, "x": "53.8251", "y": "53.5194" }, {"index": 2, "x": "55.1913", "y": "61.4078" }] ],
                words: ['key','kin','kit'],
                sounds: ['sound_k_long.ogg','sound_k_short.ogg']
            },
            {
                letter: 'l',
                groups: [ [ {"index": 0, "x": "49.5902", "y": "21.1165" }, {"index": 1, "x": "49.5902", "y": "28.8835" }, {"index": 2, "x": "49.7951", "y": "37.3786" }, {"index": 3, "x": "49.9317", "y": "46.1165" }, {"index": 4, "x": "50.2732", "y": "54.2476" }, {"index": 5, "x": "50.6148", "y": "62.9854" }] ],
                words: ['leg','lip','log'],
                sounds: ['sound_l_long.ogg','sound_l_short.ogg']
            },
            {
                letter: 'm',
                groups:[ [ {"index": 0, "x": "37.2268", "y": "37.3786" }, {"index": 1, "x": "37.5683", "y": "44.9029" }, {"index": 2, "x": "37.5683", "y": "52.6699" }, {"index": 3, "x": "37.5000", "y": "60.4369" }], [ {"index": 0, "x": "39.8224", "y": "42.7184" }, {"index": 1, "x": "42.4180", "y": "38.2282" }, {"index": 2, "x": "46.2432", "y": "37.9854" }, {"index": 3, "x": "48.8388", "y": "43.5680" }, {"index": 4, "x": "50.0683", "y": "51.8204" }, {"index": 5, "x": "49.7951", "y": "60.4369" }], [ {"index": 0, "x": "51.2978", "y": "42.9612" }, {"index": 1, "x": "55.2596", "y": "38.8350" }, {"index": 2, "x": "59.1530", "y": "40.1699" }, {"index": 3, "x": "61.6803", "y": "45.8738" }, {"index": 4, "x": "62.7732", "y": "54.6117" }, {"index": 5, "x": "62.9098", "y": "62.9854" }] ],
                words: ['man','map','mop'],
                sounds: ['sound_m_long.ogg','sound_m_short.ogg']
            },
            {
                letter: 'n',
                groups: [ [ {"index": 0, "x": "43.5792", "y": "38.9563" }, {"index": 1, "x": "43.9208", "y": "46.3592" }, {"index": 2, "x": "43.9891", "y": "53.3981" }, {"index": 3, "x": "44.1257", "y": "61.7718" }], [ {"index": 0, "x": "46.3115", "y": "44.1748" }, {"index": 1, "x": "48.8388", "y": "39.4417" }, {"index": 2, "x": "53.0738", "y": "39.8058" }, {"index": 3, "x": "55.5328", "y": "45.6311" }, {"index": 4, "x": "56.6257", "y": "53.5194" }, {"index": 5, "x": "56.4208", "y": "62.5000" }] ],
                words: ['net','new','nut'],
                sounds: ['sound_n_long.ogg','sound_n_short.ogg']
            },
            {
                letter: 'o',
                groups: [ [ {"index": 0, "x": "52.7322", "y": "38.9563" }, {"index": 1, "x": "47.4044", "y": "38.4709" }, {"index": 2, "x": "43.4426", "y": "43.5680" }, {"index": 3, "x": "43.3060", "y": "53.0340" }, {"index": 4, "x": "46.9945", "y": "60.4369" }, {"index": 5, "x": "52.5956", "y": "61.8932" }, {"index": 6, "x": "56.7623", "y": "55.2184" }, {"index": 7, "x": "56.6257", "y": "45.5097" }] ],
                words: ['off','on','ox'],
                sounds: ['sound_o_long.ogg','sound_o_short.ogg']
            },
            {
                letter: 'p',
                groups: [ [ {"index": 0, "x": "44.8087", "y": "37.6214" }, {"index": 1, "x": "44.9454", "y": "44.6602" }, {"index": 2, "x": "44.8770", "y": "53.3981" }, {"index": 3, "x": "44.9454", "y": "62.0146" }, {"index": 4, "x": "44.8770", "y": "69.9029" }, {"index": 5, "x": "44.9454", "y": "78.2767" }], [ {"index": 0, "x": "47.1995", "y": "37.0146" }, {"index": 1, "x": "51.0929", "y": "34.9515" }, {"index": 2, "x": "55.0546", "y": "37.0146" }, {"index": 3, "x": "57.9918", "y": "42.7184" }, {"index": 4, "x": "57.9235", "y": "51.6990" }, {"index": 5, "x": "55.9426", "y": "57.0388" }, {"index": 6, "x": "52.1858", "y": "61.4078" }, {"index": 7, "x": "47.1311", "y": "59.5874" }] ],
                words: ['pan','pen','pig'],
                sounds: ['sound_p_long.ogg','sound_p_short.ogg']
            },
            {
                letter: 'q',
                groups: [ [ {"index": 0, "x": "54.4399", "y": "38.3495" }, {"index": 1, "x": "49.7951", "y": "36.2864" }, {"index": 2, "x": "44.9454", "y": "39.9272" }, {"index": 3, "x": "42.9645", "y": "48.0583" }, {"index": 4, "x": "45.0820", "y": "57.5243" }, {"index": 5, "x": "49.4536", "y": "62.5000" }, {"index": 6, "x": "54.4399", "y": "59.8301" }], [ {"index": 0, "x": "56.7623", "y": "38.4709" }, {"index": 1, "x": "56.6257", "y": "46.7233" }, {"index": 2, "x": "56.6257", "y": "56.6748" }, {"index": 3, "x": "56.4891", "y": "67.4757" }, {"index": 4, "x": "56.6257", "y": "78.6408" }, {"index": 5, "x": "59.2213", "y": "75.2427" }] ],
                words: ['queen','question','quit'],
                sounds: ['sound_q_long.ogg','sound_q_short.ogg']
            },
            {
                letter: 'r',
                groups: [[{"index":0,"x":"44.7796","y":"40.6186"},{"index":1,"x":"45.1276","y":"50.3093"},{"index":2,"x":"44.8956","y":"60.6186"}],[{"index":0,"x":"46.8677","y":"43.7113"},{"index":1,"x":"51.1601","y":"39.3814"},{"index":2,"x":"55.3364","y":"44.3299"}]],
                words: ['rat','red','run'],
                sounds: ['sound_r_long.ogg','sound_r_short.ogg']
            },
            {
                letter: 's',
                groups: [[{"index":0,"x":"53.3228","y":"40.7303"},{"index":1,"x":"45.8861","y":"41.8539"},{"index":2,"x":"48.2595","y":"51.4045"},{"index":3,"x":"55.2215","y":"57.0225"},{"index":4,"x":"45.8861","y":"60.3933"}]],
                words: ['sad','sit','sun'],
                sounds: ['sound_s_long.ogg','sound_s_short.ogg']
            },
            {
                letter: 't',
                groups: [[{"index":0,"x":"50.4596","y":"24.5098"},{"index":1,"x":"50.4596","y":"37.4183"},{"index":2,"x":"50.5515","y":"48.5294"},{"index":3,"x":"50.4596","y":"60.4575"}],[{"index":0,"x":"47.1507","y":"34.6405"},{"index":1,"x":"55.1471","y":"34.4771"}]],
                words: ['tea','top','two'],
                sounds: ['sound_t_long.ogg','sound_t_short.ogg']
            },
            {
                letter: 'u',
                groups: [[{"index":0,"x":"43.3498","y":"40.4814"},{"index":1,"x":"43.7192","y":"52.7352"},{"index":2,"x":"48.0296","y":"61.7068"},{"index":3,"x":"53.6946","y":"56.6740"},{"index":4,"x":"55.4187","y":"40.4814"}],[{"index":0,"x":"55.5419","y":"48.5777"},{"index":1,"x":"56.8966","y":"59.7374"}]],
                words: ['under','up','us'],
                sounds: ['sound_u_long.ogg','sound_u_short.ogg']
            },
            {
                letter: 'v',
                groups: [[{"index":0,"x":"43.0029","y":"35.2332"},{"index":1,"x":"45.9184","y":"47.1503"},{"index":2,"x":"49.5627","y":"61.1399"},{"index":3,"x":"53.3528","y":"47.6684"},{"index":4,"x":"56.8513","y":"35.7513"}]],
                words: ['van','vase','very'],
                sounds: ['sound_v_long.ogg','sound_v_short.ogg']
            },
            {
                letter: 'w',
                groups: [[{"index":0,"x":"41.7633","y":"39.3814"},{"index":1,"x":"41.4153","y":"51.3402"},{"index":2,"x":"44.4316","y":"61.4433"},{"index":3,"x":"47.4478","y":"53.1959"},{"index":4,"x":"48.3759","y":"42.6804"},{"index":5,"x":"50.4640","y":"57.7320"},{"index":6,"x":"55.6845","y":"61.2371"},{"index":7,"x":"58.1206","y":"52.1649"},{"index":8,"x":"58.1206","y":"39.7938"}]],
                words: ['wax','wet','win'],
                sounds: ['sound_w_long.ogg','sound_w_short.ogg']
            },
            {
                letter: 'x',
                groups: [[{"index":0,"x":"44.6179","y":"35.4745"},{"index":1,"x":"47.9869","y":"43.9416"},{"index":2,"x":"51.8488","y":"52.8467"},{"index":3,"x":"55.4643","y":"62.4818"}],[{"index":0,"x":"56.2038","y":"35.7664"},{"index":1,"x":"52.3418","y":"43.5036"},{"index":2,"x":"48.0690","y":"54.1606"},{"index":3,"x":"44.0427","y":"62.7737"}]],
                words: ['axe','box','wax'],
                sounds: ['sound_x_long.ogg','sound_x_short.ogg']
            },
            {
                letter: 'y',
                groups: [[{"index":0,"x":"43.7166","y":"39.7862"},{"index":1,"x":"43.2487","y":"48.6936"},{"index":2,"x":"44.6524","y":"57.2447"},{"index":3,"x":"49.1979","y":"63.3017"},{"index":4,"x":"53.5428","y":"58.1948"},{"index":5,"x":"55.8824","y":"50.0000"},{"index":6,"x":"56.5508","y":"40.6176"}],[{"index":0,"x":"56.6176","y":"54.3943"},{"index":1,"x":"56.8182","y":"63.8955"},{"index":2,"x":"55.1471","y":"72.6841"},{"index":3,"x":"49.6658","y":"76.1283"},{"index":4,"x":"44.0508","y":"74.1093"}]],
                words: ['yellow','yes','you'],
                sounds: ['sound_y_long.ogg','sound_y_short.ogg']
            },
            {
                letter: 'z',
                groups: [[{"index":0,"x":"40.9314","y":"38.6710"},{"index":1,"x":"45.4657","y":"38.7800"},{"index":2,"x":"49.8162","y":"38.7800"},{"index":3,"x":"54.7794","y":"38.9978"},{"index":4,"x":"51.4706","y":"45.0980"},{"index":5,"x":"48.2230","y":"50.8715"},{"index":6,"x":"44.6691","y":"56.2092"},{"index":7,"x":"41.4828","y":"62.5272"},{"index":8,"x":"46.0784","y":"62.4183"},{"index":9,"x":"50.6740","y":"62.4183"},{"index":10,"x":"55.3922","y":"62.5272"}]],
                words: ['zebra','zero','zoo'],
                sounds: ['sound_z_long.ogg','sound_z_short.ogg']
            }
        ]

        this.letterSoundAssets = {};
        this.letterSoundAssets.words = [];
        this.letterSoundAssets.sounds = [];

        this.letterview = document.getElementById("letter_view");
        this.letterview_holder = document.getElementsByClassName("letter_view_holder")[0];

        this.letter_canvas = document.getElementById('letter_canvas');
        this.letter_canvas_ctx = this.letter_canvas.getContext('2d');

        this.happy_spot_canvas = document.getElementById('happy_spot_canvas');
        this.happy_spot_canvas_ctx = this.happy_spot_canvas.getContext('2d');

        this.checkpoint_canvas = document.getElementById('checkpoint_canvas');
        this.checkpoint_canvas_ctx = this.checkpoint_canvas.getContext('2d');

        this.brush_canvas = document.getElementById('brush_canvas');
        this.brush_canvas_ctx = this.brush_canvas.getContext('2d');
        this.brush_canvas_ctx.lineJoin = this.brush_canvas_ctx.lineCap = 'round';

        this.letter_canvas_overlay = document.getElementById('letter_canvas_overlay');
        this.letter_canvas_overlay_ctx = this.letter_canvas_overlay.getContext('2d');

        this.level_one_canvas_holder = document.getElementById('level_one_canvas_holder');
        this.happy_spot_canvas_holder = document.getElementById('happy_spot_canvas_holder');
        this.checkpoint_canvas_holder = document.getElementById('checkpoint_canvas_holder');
        this.brush_canvas_holder = document.getElementById('brush_canvas_holder');
        this.letter_canvas_holder = document.getElementById('letter_canvas_holder');

        this.letter_canvas_overlay_holder = document.getElementById('letter_canvas_overlay_holder');

        this.level_one_canvas = document.getElementById('level_one_canvas');
        this.level_one_canvas_ctx = this.level_one_canvas.getContext('2d');

        //setting canvases to fit to the screen dimensions
        this.setDimensions();
        this.setupEvents();
        
        //Starting the game on the fist letter in this.checkpoints 

        this.assetsLoaded = true;

        /*
        this.allAssetsLoaded( () => {
            this.assetsLoaded = true;
        });
        */

        /*
        $('.start_game').on('click', (event) => {
            console.log('START');
            var nr = $('.level_number').val();
            this.currentLevel = parseInt(nr);
            this.currentletterIndex = 0;
            $('.level_select_screen').css({'display':'none'});
            this.startLetter(this.checkpoints[this.currentletterIndex]);
        });
        */

        //Starting the game on the fist letter in this.checkpoints
        this.startLetter(this.checkpoints[this.currentletterIndex]);

        // Add exit button
        core.utils.addExitButton();
    }

    resetLetterAssets() {
        this.letterSoundAssets.words.forEach((sound,i) => {
            sound.pause();
            sound.setAttribute('src','');
        });
        this.letterSoundAssets.sounds.forEach((sound,i) => {
            sound.pause();
            sound.setAttribute('src','');
        });
    }

    addLetterSoundAssets() {

        this.resetLetterAssets();

        // words
        this.checkpoints[this.currentletterIndex].words.forEach((word,i) => {

            if (typeof this.letterSoundAssets.words[i] === 'undefined') {
                let _audio = new Audio(core.getActiveWidget().path+'/assets/audio/letters/'+this.checkpoints[this.currentletterIndex].letter+'/word_'+word+'.ogg');
                _audio.preload = 'auto';
                this.letterSoundAssets.words.push(_audio);
            } else {
                this.letterSoundAssets.words[i].src = core.getActiveWidget().path+'/assets/audio/letters/'+this.checkpoints[this.currentletterIndex].letter+'/word_'+word+'.ogg';
            }
        });
        // sounds
        this.checkpoints[this.currentletterIndex].sounds.forEach((sound,i) => {
            if (typeof this.letterSoundAssets.sounds[i] === 'undefined') {
                let _audio = new Audio(core.getActiveWidget().path+'/assets/audio/letters/'+this.checkpoints[this.currentletterIndex].letter+'/'+sound);
                _audio.preload = 'auto';
                this.letterSoundAssets.sounds.push(_audio);
            } else {
                this.letterSoundAssets.sounds[i].src = core.getActiveWidget().path+'/assets/audio/letters/'+this.checkpoints[this.currentletterIndex].letter+'/'+sound;
            }
        });
    }

    allAssetsLoaded(callback) {

        var assets_array = [];

        if (this.initialLoadDone === false) {
            //penta
            this.pentaScale.forEach((sound) => {
                assets_array.push(this.fileLoaded('sound',sound));
            });
            assets_array.push(this.color_in_audio);
        }

        //letter words
        this.letterSoundAssets.words.forEach((sound,i) => {
            assets_array.push(this.fileLoaded('sound',sound));
        });
        //letter sounds
        this.letterSoundAssets.sounds.forEach((sound,i) => {
            assets_array.push(this.fileLoaded('sound',sound));
        });

        if (this.initialLoadDone === false) {
            //font
            this.laraFont = new FontFace('Lara', 'url('+this.skin("checheza.skin.official").addon.getAsset("lara")+')');
            assets_array.push(this.fileLoaded('font',this.laraFont));
        }

        Promise.all(assets_array).then(() => {
            this.initialLoadDone = true;
            callback();
        }).catch(err => {
            console.log('Oh no, epic failure!',err);
        });
    }

    fileLoaded(type,obj) {
        if (type === 'sound') {
            return new Promise((resolve, reject) => {
                obj.oncanplaythrough = () => {
                    resolve();
                };
                obj.onerror = (error) => {
                    reject();
                };
            });
        }
        if (type === 'font') {
            return new Promise((resolve, reject) => {
                obj.load().then(font => {
                    document.fonts.add(font);
                    resolve(obj);
                }, function () {
                    reject(obj);
                });
            });
        }
    }

    playSound(sound) {
        sound.currentTime = 0;
        sound.play();
    }

    parseLetterJson(json) {
        var that = this;
        return json.map((group,i) => {
            return group.map((item,ii) => {
                return {x:that.procentToPxX(item.x),y:that.procentToPxY(item.y)}
            })
        });
    }

    makeUnderlinedHtml(letter,word) {
        return word.split('').map((letter_,i) => {
            return letter_ === letter ? '<span class="underlined">' + letter_ + '</span>' : '<span>' + letter_ + '</span>';
        }).join('');
    }

    showIntroWord(word_index,letter,word,x,y) {
        $(this.letter_canvas_overlay_holder).append('<h3 style="top:' + y + '%;left:' + x + '%" class="intro_word intro_word_1">' + this.makeUnderlinedHtml(letter,word) + '</h3>');
        this.playSound(this.letterSoundAssets.words[word_index]);
    }

    showIntroLetter(letter,x,y) {
        $(this.letter_canvas_overlay_holder).append('<h3 style="top:' + y + '%;left:' + x + '%" class="intro_letter">' + letter + '</h3>');
        this.playColorIn();
    }

    playColorIn() {
        this.playSound(this.color_in_audio);
        setTimeout(() => {
            this.playSound(this.letterSoundAssets.sounds[0]);
        },1500);
    }

    playIntro(checkpoint,callback) {

        var word_horiz_spacing = (60/checkpoint.words.length);
        var word_vert_spacing = 80/checkpoint.words.length;
        var timeoutAccumulation = 0;

        checkpoint.words.forEach( (word,i) => {

            var time = i*((this.letterSoundAssets.words[i].duration*1000)+2000);

            setTimeout( () => {
                this.showIntroWord(i,checkpoint.letter,word,(word_horiz_spacing*i)+20,(word_vert_spacing*i)+10);
            },time);
            timeoutAccumulation = timeoutAccumulation+time;
        });

        setTimeout( () => {
            $(this.letter_canvas_overlay_holder).find('h3').remove();
            this.showIntroLetter(checkpoint.letter,50,50);
        },timeoutAccumulation);

        console.log('timeoutAccumulation',timeoutAccumulation);

        setTimeout( () => {
            $(this.letter_canvas_overlay_holder).find('h3').remove();
            this.preventDrawing = false;
            callback();
        },timeoutAccumulation);
    }

    startLetter(letterCheckpoints) {
        this.addLetterSoundAssets();
        this.resetCanvases();

        this.parseCurrentCheckpoints();

        this.allAssetsLoaded( () => {
            this.playIntro(this.checkpoints[this.currentletterIndex],() => {
                this.initLetterCanvas(this.checkpoints[this.currentletterIndex].letter);
                this.showLetter();
            });
        });
    }

    resetCanvases() {
        this.brushLines = [];

        this.clearCanvas(this.level_one_canvas_ctx);
        this.clearCanvas(this.letter_canvas_ctx);

        this.brush_canvas_holder.classList.remove('hiddenCanvas');
        this.checkpoint_canvas_holder.classList.remove('hiddenCanvas');
        this.brush_canvas_holder.classList.remove('hiddenCanvas');
        this.happy_spot_canvas_holder.classList.remove('hiddenCanvas');
        this.level_one_canvas_holder.classList.remove('hiddenCanvas');
    }

    setDimensions() {

        var wrapperHeight = Math.max(window.innerHeight, document.documentElement.clientHeight);

        this.letterview.style.width = ((wrapperHeight) * (16/9)) + 'px'; //(8/5)
        this.letterview.style.height = wrapperHeight + 'px';

        this.viewWidth = $(this.letterview).width();
        this.viewHeight = $(this.letterview).height();

        this.letter_canvas.height = this.viewHeight;
        this.letter_canvas.width = this.viewWidth;
        this.happy_spot_canvas.height = this.viewHeight;
        this.happy_spot_canvas.width = this.viewWidth;
        this.brush_canvas.height = this.viewHeight;
        this.brush_canvas.width = this.viewWidth;
        this.checkpoint_canvas.height = this.viewHeight;
        this.checkpoint_canvas.width = this.viewWidth;
        this.letter_canvas_overlay.height = this.viewHeight;
        this.letter_canvas_overlay.width = this.viewWidth;
        this.letterview_holder.style.display = "block";

        this.level_one_canvas.height = this.viewHeight;
        this.level_one_canvas.width = this.viewWidth;
    }

    showLetter() {
        this.letterViewOffsetLeft = $(this.letterview).offset().left;
    }

    drawImageProp(ctx, img, x, y, w, h, offsetX, offsetY) {

        if (arguments.length === 2) {
            x = y = 0;
            w = ctx.canvas.width;
            h = ctx.canvas.height;
        }

        // default offset is center
        offsetX = typeof offsetX === "number" ? offsetX : 0.5;
        offsetY = typeof offsetY === "number" ? offsetY : 0.5;

        // keep bounds [0.0, 1.0]
        if (offsetX < 0) offsetX = 0;
        if (offsetY < 0) offsetY = 0;
        if (offsetX > 1) offsetX = 1;
        if (offsetY > 1) offsetY = 1;

        var iw = img.width,
            ih = img.height,
            r = Math.min(w / iw, h / ih),
            nw = iw * r,   // new prop. width
            nh = ih * r,   // new prop. height
            cx, cy, cw, ch, ar = 1;

        // decide which gap to fill
        if (nw < w) ar = w / nw;
        if (Math.abs(ar - 1) < 1e-14 && nh < h) ar = h / nh;  // updated
        nw *= ar;
        nh *= ar;

        // calc source rectangle
        cw = iw / (nw / w);
        ch = ih / (nh / h);

        cx = (iw - cw) * offsetX;
        cy = (ih - ch) * offsetY;

        // make sure source rectangle is valid
        if (cx < 0) cx = 0;
        if (cy < 0) cy = 0;
        if (cw > iw) cw = iw;
        if (ch > ih) ch = ih;

        // fill image in dest. rectangle
        ctx.drawImage(img, cx, cy, cw, ch,  x, y, w, h);
    }

    clearCanvas(canvas) {
        canvas.clearRect(0, 0, this.viewWidth, this.viewHeight);
    }

    initLetterCanvas(letter) {

        this.background = new Image();
        this.background.src = this.skin("checheza.skin.official").addon.getAsset("tracing-letters-bg-blue-lines");

        this.background.onload = () => {

            this.clearCanvas(this.letter_canvas_ctx);
            this.clearCanvas(this.level_one_canvas_ctx);

            var scaledFontsize = this.letter_canvas.width * 0.5;

            if (this.currentLevel === 1) {
                this.level_one_canvas_ctx.globalCompositeOperation = "source-over";
                this.level_one_canvas_ctx.fillStyle = "rgb(198,198,198)";
                this.level_one_canvas_ctx.font = 'normal ' + scaledFontsize + 'px Lara';
                var textWidth = this.level_one_canvas_ctx.measureText(letter).width;
                this.level_one_canvas_ctx.textBaseline = 'middle';
                this.level_one_canvas_ctx.fillText(letter , (this.letter_canvas.width/2) - (textWidth / 2), (this.letter_canvas.height/2.45));

                this.levelOnePixelData = this.level_one_canvas_ctx.getImageData(0,0, this.level_one_canvas.width, this.level_one_canvas.height);

                this.initialPixelCount = this.getPixelAmountData(198,198,198);
                this.level_one_canvas_ctx.globalCompositeOperation = "source-over";
            }

            this.letter_canvas_ctx.globalCompositeOperation = "source-over";
            this.drawImageProp(this.letter_canvas_ctx, this.background, 0, 0, this.viewWidth, this.viewHeight);

            this.letter_canvas_ctx.globalCompositeOperation = "destination-out";
            this.letter_canvas_ctx.font = 'normal ' + scaledFontsize + 'px Lara';
            var textWidth = this.letter_canvas_ctx.measureText(letter).width;
            
            this.letter_canvas_ctx.textBaseline = 'middle';
            this.letter_canvas_ctx.fillText(letter , (this.letter_canvas.width/2) - (textWidth / 2), (this.letter_canvas.height/2.45));

            if (this.currentLevel === 2 || this.currentLevel === 3) {
                this.animateCheckpoints();
            }
        }
    }

    parseCurrentCheckpoints() {
        this.checkpoints[this.currentletterIndex].groups = this.parseLetterJson(this.checkpoints[this.currentletterIndex].groups);
    }

    procentToPxX(procent) {
        return this.viewWidth * (parseFloat(procent)/100);
    }

    procentToPxY(procent) {
        return this.viewHeight * (parseFloat(procent)/100);
    }

    animateCheckpoints() {
        var currentPointDiameter = 5;
        const fps = 18;
        var now, then, elapsed;
        var fpsInterval = 1000 / fps;
        then = Date.now();
        var startTime = then;

        const drawCheckpoints = () => {

            now = Date.now();
            elapsed = now - then;

            if (elapsed > fpsInterval) {

                then = now - (elapsed % fpsInterval);

                this.clearCanvas(this.checkpoint_canvas_ctx);

                var groupSpotColor;
                var activeGroup = [];

                // draw all groups with same color for level 3
                if (this.currentLevel === 2) {
                    var groupColor = 'rgba(153,153,153,0.5)';
                }
                if (this.currentLevel === 3) {
                    var groupColor = 'rgba(52,175,8,1)';
                }

                // other groups
                for (var i = this.currentGroup; i < this.checkpoints[this.currentletterIndex].groups.length; i++) {
                    if (i !== this.currentGroup) {
                        for (var ii = 0; ii < this.checkpoints[this.currentletterIndex].groups[i].length; ii++) {
                            this.drawCircle(this.checkpoint_canvas_ctx, this.checkpoints[this.currentletterIndex].groups[i][ii].x, this.checkpoints[this.currentletterIndex].groups[i][ii].y, 5, groupColor, 'rgba(102,255,25,1)');
                        }
                    } else {
                        activeGroup.push(this.checkpoints[this.currentletterIndex].groups[i]);
                    }
                }

                // active group
                for (var i = 0; i < activeGroup.length; i++) {
                    for (var ii = 0; ii < activeGroup[i].length; ii++) {
                        if (ii === this.nextCheckpointIndex) {
                            this.drawCircle(this.checkpoint_canvas_ctx, activeGroup[i][ii].x, activeGroup[i][ii].y, currentPointDiameter, 'rgba(202,255,25,0.7)', 'rgba(102,255,25,1)');
                        }
                        this.drawCircle(this.checkpoint_canvas_ctx, activeGroup[i][ii].x, activeGroup[i][ii].y, 5, 'rgba(52,175,8,1)', 'rgba(102,255,25,1)');
                    }
                }

                currentPointDiameter = currentPointDiameter+1;
                if (currentPointDiameter > 30) {
                    currentPointDiameter = 5;
                }
            }

            this.checkpointsRequestAnimationFrame = window.requestAnimationFrame(drawCheckpoints);
        }

        drawCheckpoints();
    }

    drawArrow(ctx,x1,y1,x2,y2) {

        var padded = this.paddedCoordinates(x1,y1,x2,y2,10,10);
        var midPoint = this.midpoint(padded.x1,padded.y1,padded.x2,padded.y2);

        curvedArrow({
            ctx: ctx,
            p0x: x1,
            p0y: y1,
            p1x: midPoint[0],
            p1y: midPoint[1],
            p2x: x2,
            p2y: y2,
            color: '#a21acc',
            lineWidth: 10,
            width: window.outerWidth,
            height: window.outerHeight
        });

        /*
        var padded = this.paddedCoordinates(x1,y1,x2,y2,18,18);

        var midPoint = this.midpoint(padded.x1,padded.y1,padded.x2,padded.y2);

        curvedArrow({
            ctx: ctx,
            p0x: padded.x1,
            p0y: padded.y1,
            p1x: midPoint[0],
            p1y: midPoint[1],
            p2x: padded.x2,
            p2y: padded.y2,
            color: '#a21acc',
            lineWidth: 10,
            width: window.outerWidth,
            height: window.outerHeight
        });
        */
    }

    paddedCoordinates(x1, y1, x2, y2, a, b) {
        var unitVector = { x:0, y:0 };
        this.buildUnitVector(x1, y1, x2, y2, unitVector);
        return {
            x1: x1 + unitVector.x * a,
            y1: y1 + unitVector.y * a,
            x2: x2 - unitVector.x * b,
            y2: y2 - unitVector.y * b
        }
    }

    buildUnitVector(x1, y1, x2, y2, uVect) {
        uVect.x = (x2 - x1);
        uVect.y = (y2 - y1 );
        var vectorNorm = Math.sqrt( (uVect.x*uVect.x)+(uVect.y*uVect.y) );
        uVect.x/=vectorNorm;
        uVect.y/=vectorNorm;
    }

    midpoint(lat1, long1, lat2, long2) {
        return [lat1 + (lat2 - lat1), long1 + (long2 - long1)];
    }

    setupEvents() {
        var that = this;

        $(this.letter_canvas_overlay).on('mousedown touchstart', function(event) {
            if (this.preventDrawing === true) { return false; }
            that.brushLines.push([]);

            if (typeof event.clientX !== 'undefined') {
                var x = event.clientX;
                var y = event.clientY;
            } else {
                var x = event.originalEvent.touches[0].pageX;
                var y = event.originalEvent.touches[0].pageY;
            }

            that.brushIsDown = true;
            that.brushLines[that.brushLines.length-1].push({
                x: x,
                y: y,
                width: that.getRandomInt(3, 5)
            });

            if (this.currentLevel === 1) {
                    that.drawBrushStroke(that.level_one_canvas_ctx, x, y);
            } else {
                that.drawBrushStroke(that.brush_canvas_ctx, x, y);
            }
            
            if (this.currentLevel === 2 || this.currentLevel === 3) {
                that.doCollisionDetection(x, y);
            }
        });

        $(this.letter_canvas_overlay).on('mouseup touchend', (event) => {
            if (this.preventDrawing === true) { return false; }
            this.brushIsDown = false;
            if (this.currentLevel === 1) {
                this.preventDrawing = true;
                if(this.leveloneIsLetterDone()) {
                    this.preventDrawing = true;
                    this.currentletterIndex = this.currentletterIndex+1;
                    this.gotoNextLetter();
                } else {
                    this.preventDrawing = false;
                }
            }
        });

        $(this.letter_canvas_overlay).on('mousemove touchmove', this.throttle( (event) => {
            if (this.preventDrawing === true) { return false; }
            if (that.brushIsDown === true) {

                if (typeof event.clientX !== 'undefined') {
                    var x = event.clientX;
                    var y = event.clientY;
                } else {
                    var x = event.originalEvent.touches[0].screenX - this.letterview.offsetLeft;
                    var y = event.originalEvent.touches[0].screenY - this.letterview.offsetTop;
                }

                if (this.currentLevel === 1) {
                    that.drawBrushStroke(that.level_one_canvas_ctx, x, y);
                } else {
                    that.drawBrushStroke(that.brush_canvas_ctx, x, y);
                }

                if (this.currentLevel === 2 || this.currentLevel === 3) {
                    that.doCollisionDetection(x, y);
                }
            }
        },10));

        this.resizeTimeout = false;

        window.addEventListener('resize',() => {
            clearTimeout(this.resizeTimeout);
            this.resizeTimeout = setTimeout(this.setScreenProportions, 0);
        });
    }

    /*
      Function to find out if letter is done 
    */
    leveloneIsLetterDone() {
        var nrPixels = this.getPixelAmountData(198,198,198);
        return nrPixels < this.initialPixelCount*0.1;
    }

    /*
      getPixelColourData(x, y)
      returns the rgba value of the pixel at position x and y
    */
    getPixelColourData(x,y) {

        var index = (y * this.levelOnePixelData.width + x) * 4;

        return {
            r:this.levelOnePixelData.data[index],
            g:this.levelOnePixelData.data[index + 1],
            b:this.levelOnePixelData.data[index + 2],
            a:this.levelOnePixelData.data[index + 3]
        };
    }

    /*
        getpixelamount(r, g, b)
        returns the amount of pixels in the canvas of the colour provided
    */
    getPixelAmountData(r, g, b) {
        var levelOnePixelData = this.level_one_canvas_ctx.getImageData(0, 0,this.viewWidth, this.viewHeight);
        var all = levelOnePixelData.data.length;
        var amount = 0;
        for (var i = 0; i < all; i += 4) {
            if (levelOnePixelData.data[i] == r &&
                levelOnePixelData.data[i + 1] == g &&
                levelOnePixelData.data[i + 2] == b) {
                amount++;
            }
        }
        return amount;
    }

    throttle(func, limit) {
        let inThrottle;
        return function() {
            const args = arguments
            const context = this
            if (!inThrottle) {
                func.apply(context, args)
                inThrottle = true
                setTimeout(() => inThrottle = false, limit)
            }
        }
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    relMouseCoords(canvas,x,y) {
        var totalOffsetX = 0;
        var totalOffsetY = 0;
        var canvasX = 0;
        var canvasY = 0;

        do {
            totalOffsetX += canvas.offsetLeft - canvas.scrollLeft;
            totalOffsetY += canvas.offsetTop - canvas.scrollTop;
        }
        while(canvas = canvas.offsetParent)

        canvasX = x - totalOffsetX;
        canvasY = y - totalOffsetY;

        return {x:canvasX, y:canvasY}
    }

    playPenta(isLast) {
        if (isLast) {
            this.playSound(this.pentaScale[this.pentaScale.length-1]);
            this.scaleCounter = 0;
            return;
        }
        this.playSound(this.pentaScale[this.scaleCounter]);
        this.scaleCounter++;
        if (this.scaleCounter === this.pentaScale.length-2) {
            this.scaleCounter = 0;
        }
    }

    groupPerfectOrder() {
        var nrCorrect = 0;
        for (var i = 0; i < this.checkpointGroupOrderIndexes.length; i++) {
            if (this.checkpointGroupOrderIndexes[i] === i) {
                this.firstCheckpointInGroupWasHit = true;
                nrCorrect++;
            }
        }
        return nrCorrect === this.checkpoints[this.currentletterIndex].groups[this.currentGroup].length;
    }

    groupDone() {
        return this.checkpointGroupOrderIndexes.length === this.checkpoints[this.currentletterIndex].groups[this.currentGroup].length;
    }

    setNextCheckpoint(index) {
        this.nextCheckpointIndex = index;
    }

    doCollisionDetection(x,y) {
        var pointer = this.relMouseCoords(this.letter_canvas_overlay,x,y);
        var posX = pointer.x;
        var posY = pointer.y;

        for (var ii = 0; ii < this.checkpoints[this.currentletterIndex].groups[this.currentGroup].length; ii++) {
            if (this.checkpoints[this.currentletterIndex].groups[this.currentGroup][ii].checked === true) {
                continue;
            }
            if (Math.sqrt( ( posX-this.checkpoints[this.currentletterIndex].groups[this.currentGroup][ii].x ) * ( posX-this.checkpoints[this.currentletterIndex].groups[this.currentGroup][ii].x )  + ( posY-this.checkpoints[this.currentletterIndex].groups[this.currentGroup][ii].y ) * ( posY-this.checkpoints[this.currentletterIndex].groups[this.currentGroup][ii].y ) ) < ( 10 + 10 )) {

                this.checkpoints[this.currentletterIndex].groups[this.currentGroup][ii].checked = true;
                this.checkpointGroupOrderIndexes.push(ii);

                if (this.currentLevel === 2) {
                    this.setNextCheckpoint(ii+1);
                    this.playPenta(ii === this.checkpoints[this.currentletterIndex].groups[this.currentGroup].length);
                    this.firstCheckpointInGroupWasHit = true;
                    
                    if (this.groupDone()) {
                        this.clearCanvas(this.checkpoint_canvas_ctx);
                        this.clearCanvas(this.happy_spot_canvas_ctx);
                        setTimeout(() => {
                            this.preventDrawing = true;
                            this.brushIsDown = false;
                        },100);
                        setTimeout(() => {
                            this.preventDrawing = false;
                            this.goToNextGroup();
                        },500);
                    } else {
                        this.addHappySpot(this.checkpoints[this.currentletterIndex].groups[this.currentGroup][ii].x,this.checkpoints[this.currentletterIndex].groups[this.currentGroup][ii].y);
                    }
                }

                if (this.currentLevel === 3) {
                    this.setNextCheckpoint(ii+1);
                    this.playPenta(ii === this.checkpoints[this.currentletterIndex].groups[this.currentGroup].length);
                    if (this.groupPerfectOrder()) {
                        setTimeout(() => {
                            this.preventDrawing = true;
                            this.brushIsDown = false;
                        },200);
                        setTimeout(() => {
                            this.preventDrawing = false;
                            this.goToNextGroup();
                        },500);
                    } else {
                        this.addHappySpot(this.checkpoints[this.currentletterIndex].groups[this.currentGroup][ii].x,this.checkpoints[this.currentletterIndex].groups[this.currentGroup][ii].y);
                    }
                }

            }
        }
    }

    goToNextGroup() {
        this.nextCheckpointIndex = 0;
        this.firstCheckpointInGroupWasHit = false;
        this.currentGroup = this.currentGroup+1;
        this.clearCanvas(this.checkpoint_canvas_ctx);
        this.clearCanvas(this.happy_spot_canvas_ctx);
        if (this.currentGroup < this.checkpoints[this.currentletterIndex].groups.length) {
            this.checkpointGroupOrderIndexes = [];
        } else {
            this.currentGroup = 0;
            this.checkpointGroupOrderIndexes = [];
            window.cancelAnimationFrame(this.checkpointsRequestAnimationFrame);
            this.currentletterIndex = this.currentletterIndex+1;
            this.gotoNextLetter();
        }
    }

    gotoNextLetter() {

        this.playSound(this.letter_win_sound);
        
        this.firstCheckpointInGroupWasHit = false;
        setTimeout(() => {
            setTimeout(() => {
                //this.checkpoint_canvas_holder.classList.add('hiddenCanvas');
                //this.brush_canvas_holder.classList.add('hiddenCanvas');
                //this.happy_spot_canvas_holder.classList.add('hiddenCanvas');
                //this.level_one_canvas_holder.classList.add('hiddenCanvas');
                
                this.saveProgress();
                setTimeout(() => {
                    this.clearCanvas(this.level_one_canvas_ctx);
                    this.clearCanvas(this.happy_spot_canvas_ctx);
                    this.clearCanvas(this.brush_canvas_ctx);
                    this.clearCanvas(this.checkpoint_canvas_ctx);
                    this.startLetter(this.checkpoints[this.currentletterIndex]);
                },2000);
            },300);
        },6000);
    }

    resetSavedProgress() {
        var storage = window.localStorage;
        storage.setItem('lettertracer_progress','0');
    }

    getSavedProgress() {
        var storage = window.localStorage;
        storage.setItem('lettertracer_progress','0');
        return storage.getItem('lettertracer_progress') === null ? 0 : parseInt(storage.getItem('lettertracer_progress'));
    }

    saveProgress() {
        var storage = window.localStorage;
        if (storage.getItem('lettertracer_progress') === null) {
            storage.setItem('lettertracer_progress','0');
        } else {
            storage.setItem('lettertracer_progress',String(this.currentletterIndex));
        }
    }

    checkpointGroupOrder(group,spot) {
        var result = 'fail';
        for (var i = 0; i < group.length-1; i++) {
            if (group[i].x === spot.x && group[i].y === spot.y) {
                result = 'hit';
            }
        }
        if (i === group.length-2) {
            result = 'lastingroup';
        }
        return result;
    }

    drawCircle(context,x,y,rad,color,borderColor) {
        context.beginPath();
        context.arc(x, y, rad, 0, 2 * Math.PI);
        if (borderColor !== null) {
            context.strokeStyle = borderColor;
            context.lineWidth = 3;
        }
        context.fillStyle = color;
        context.fill();
    }

    addHappySpot(x,y) {
        this.drawCircle(this.happy_spot_canvas_ctx,x,y,5,'rgba(102,255,25,1)',null);
        setTimeout(() => {
            this.drawCircle(this.happy_spot_canvas_ctx,x,y,8,'rgba(102,255,25,1)',null);
        },50);
        setTimeout(() => {
            this.drawCircle(this.happy_spot_canvas_ctx,x,y,10,'rgba(102,255,25,1)',null);
        },100);
        setTimeout(() => {
            this.drawCircle(this.happy_spot_canvas_ctx,x,y,12,'rgba(102,255,25,1)',null);
        },150);
    }

    drawBrushStroke(context,x,y) {
        if (this.currentLevel === 2 && this.firstCheckpointInGroupWasHit == false||
            this.currentLevel === 3 && this.firstCheckpointInGroupWasHit == false) {
            // return false;
        }
        var x = x - this.letterViewOffsetLeft;

        if (this.currentLevel !== 1) {
            this.clearCanvas(context);
        }
        if (this.currentLevel === 2 && this.firstCheckpointInGroupWasHit == false||
            this.currentLevel === 3 && this.firstCheckpointInGroupWasHit == false) {
            var brushColor = '#53bc07';
        } else {
            var brushColor = '#53bc07';
        }
        this.brushLines[this.brushLines.length-1].push({
            x: x,
            y: y,
            width: this.brushWidth,
            strokeStyle: brushColor
        });
        for (var i = 0; i < this.brushLines.length; i++) {
            for (var ii = 1; ii < this.brushLines[i].length; ii++) {

                context.lineCap="round";
                context.moveTo(this.brushLines[i][ii-1].x, this.brushLines[i][ii-1].y);
                context.strokeStyle = this.brushLines[i][ii].strokeStyle;
                context.beginPath();
                context.lineWidth = this.brushLines[i][ii].width;
                context.lineTo(this.brushLines[i][ii].x, this.brushLines[i][ii].y);
                context.stroke();
            }
        }
    }

}