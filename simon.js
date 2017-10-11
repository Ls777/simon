$(function() {
  
  
  var arc0 = document.querySelector('#arc0');
  var arc1 = document.querySelector('#arc1');
  var arc2 = document.querySelector('#arc2');
  var arc3 = document.querySelector('#arc3');
  
  var colors =  ["#3F9", "#F39", "#39F", "#FE5"]
  
  var chooseDifficultyString = '<div id="easy" class="flex-item">Easy</div><small class="flex-item">or</small><div id="hard" class="flex-item">Hard</div>'
  
  var frequencies = [329.63,261.63,220,164.81];
  var arcSound = []
  
  for (i = 0; i < 4; i++) {
    arcSound[i] = new Pizzicato.Sound({ 
      source: 'wave', 
      options: {
          frequency: frequencies[i]
      }
    });
  }
  
  var introSound = new Pizzicato.Sound({
    source: 'wave', 
      options: {
          type: 'triangle',
          frequency: 50,
          attack : 1,
          release : 0.5
      }
  });
  
  
  
  //introSound.play();
  var distortion = new Pizzicato.Effects.Distortion({
    gain: 0.4
  });
  
var ringModulator = new Pizzicato.Effects.RingModulator({
    speed: 30,
    distortion: 1,
    mix: 0.5
});

  
  var tremolo = new Pizzicato.Effects.Tremolo({
    speed: 9,
    depth: 0.8,
    mix: 0.8
  });

  introSound.addEffect(distortion);
  introSound.addEffect(tremolo);
  
  
  function playIntroSound() {
    introSound.play();
    
    var i = 0
    function loop () {
      if (i < 20) {
        setTimeout(function() {
          introSound.frequency = i * 10 + 50;
          loop();
          i++; 
        }, 500)
      }
    }
    loop();

    setTimeout(function() {
      introSound.stop();
    }, 1000)
  }


  
  var arcEntrance = {  
    targets: '.arc',
    easing: 'easeOutCubic',
    scale: [1,1],
    strokeWidth: [30, 30],
    duration: function(el, i, l) {
      return 300 + (i * 100);
    },
    strokeDashoffset: [anime.setDashoffset, 0],
    delay: function(el, i, l) {
      return i * 100;
    },
  }
  
  var arcOutlineEntrance = {  
    targets: '.arcOL',
    easing: 'easeOutQuad',
    scale: 1,
    strokeWidth:  1,
    duration: function(el, i, l) {return 1000 - (i * 100)},
    strokeDashoffset: [anime.setDashoffset, 0],
    delay: function(el, i, l) {return i * 100},
    rotate: {value: [180,0,90], delay: 0, duration: 1200},
    autoplay: true
  }

  var arcOutlineEntranceWin = Object.assign({}, arcOutlineEntrance);
  arcOutlineEntranceWin.complete = function() {
    anime(arcOutlineWin);
  }
  
  var arcOutlineHide = {
    targets: '.arcOL',
    easing: 'easeOutQuad',
    strokeWidth: [1,0],
    duration: 1,
  }
  
  var arcOutlineShow = {
    targets: '.arcOL',
    easing: 'easeOutQuad',
    strokeWidth: [0,1],
    duration: 1,
  }
  
  
  
  var textEntrance = {
    easing: 'easeOutCirc',
    targets: '.container',
    color: {value:[colors[0],"#FFF"],delay: 200},
    opacity: 1,
    scale: [0,1],
    skewY: ["-60deg","-5deg"],
    rotate: [-5, 715],
    duration: 1000,
    begin: function(anim) {
      $(".container").css("visibility", "visible");
      //alert("visible")
    }
  }
  
  var circleEntranceFx = {
    easing: 'easeOutCirc',
    targets: '.circle',
    backgroundColor: {value:"#FFF",delay: 200},
    opacity: {value:[1,0], delay: 50, duration: 100},
    scale: [0,3],
    duration: 1000,
    begin: function(anim) {
      $(".circle").css("visibility", "visible");
    }
  }
  
  
  var arcFadeAway = {  
    targets: ".arc",
    easing: 'easeOutQuart',
    scale: [1, 2],
    strokeWidth:  0,
    duration: 500,
  }
  
   var arcFadeExplode = {  
    targets: ".arc",
    easing: 'easeOutQuart',
    scale: [1, 0.6],
    strokeWidth:  2,
    duration: 1000,
    rotate: [0,-90],
    strokeDashoffset:  [0, 10, anime.setDashoffset],
  }

  var arcFxOuterWinIntro = {  
    targets: ".arcFXouter",
    easing: 'easeInSine',
    scale: [3.9,3.9],
    opacity: [1,1],
    strokeWidth:  [100,100],
    duration: 1000,
    rotate: 36,
    strokeDashoffset:  [anime.setDashoffset, 0],
    complete: function() {
      anime(arcFxOuterWin);
    }
  }

  var arcWinIntro = {  
    targets: ".arc",
    easing: 'easeInSine',
    scale: .7,
    strokeWidth:  2,
    duration: 1000,
    rotate: {value: [0,90], easing: 'easeInQuart'},
    strokeDashoffset:  20,
    complete: function() {
      anime(arcWin)
    }
  }
  
  var arcWin = {  
    targets: ".arc",
    easing: 'linear',
    scale: [.7,.7],
    strokeWidth:  [2,2],
    duration: 1000,
    rotate: 450,
    strokeDashoffset:  [20, 20],
    loop: true,
  }
  
   var arcOutlineWin = {  
    targets: '.arcOL',
    easing: 'linear',
    scale: 1,
    strokeWidth:  1,
    //duration: function(el, i, l) {return 1000 - (i * 100)},
    rotate: {value: [360,0,], delay: 0, duration: 5000},
    autoplay: true,
    loop: true,
  }

  var arcFxOuterWin = {  
    targets: ".arcFXouter",
    easing: 'linear',
    opacity: [1,1],
    scale: [3.9,3.9],
    strokeWidth:  [100,100],
    duration: 10000,
    rotate: [36,396],
    autoplay: true,
    loop: true
  }
  
  
  var arcHighlightFx = {  
    targets: "#arcFXouter1",
    easing: 'easeOutCirc',
    scale: [1.25,1.7],
    stroke: {value: ["#FFFFFF", colors[1]], delay: 0},
    opacity: {value: [1,0], delay: 200},
    strokeWidth:  [4,0],
    duration: 1500,
    autoplay: true
  }
  
  var arcInnerHighlightRotate = {
    targets: '#arcFX0',
    easing: 'easeOutCubic',
    scale: [.73, .7],
    strokeWidth: [1, 8],
    duration: 400,
    strokeDashoffset: [0, (-1) * anime.setDashoffset],
  }
  
  var arcInnerHighlightRotateReset  = {
    targets: '#arcFX0',
    easing: 'easeOutCubic',
    scale: [.73, .7],
    strokeWidth: [0, 0],
    duration: 1,
  }
  
  var arcInnerHighlightRotateOut = {
    targets: '#arcFX0',
    easing: 'easeOutCubic',
    scale: .73,
    strokeWidth: 0,
    duration: 200,
    delay: 5,
  }
  
  var arcHighlightEffectIn = {  
    targets: '.arcFX',
    easing: 'easeOutCubic',
    opacity: [1,1],
    scale: [.4, .7],
    strokeWidth: [20, 0],
    duration: function(el, i, l) {
      return 300 + (i * 100);
    },
    strokeDashoffset: [anime.setDashoffset, 0],
    delay: function(el, i, l) {
      return i * 100;
    },
  }
  
  var arcHighlightEffectOut = Object.assign({}, arcHighlightEffectIn);
  arcHighlightEffectOut.targets = ".arcFXouter"
  arcHighlightEffectOut.scale = [1, 1.3]
  
 
  
  var startScreenOut = anime({
    targets: '.startScreen',
    easing: 'easeInOutQuad',
    scaleY: 0.95,
    scaleX: 0.9,
    duration: 250,
    opacity: 0,
    autoplay: false,
    complete: function() {
      $(".startScreen").css("visibility", "hidden");
    }
  })
  
   var containerOut = {
    targets: '.container',
    easing: 'easeInOutQuad',
    color: ["#FFF", colors[0]],
    scaleY: 0.95,
    scaleX: 0.9,
    duration: 250,
    opacity: 0,
    skewY: ["-5deg", "-5deg"],
    rotate: [-5, -5],
  }
  
  
  var introSeq = anime.timeline()
  introSeq.autoplay = false;
  arcOutlineEntrance.offset = "-=1400"
  introSeq.add([arcHighlightEffectOut, arcHighlightEffectIn, arcOutlineEntrance]);
  
  var startAnim = anime.timeline();
  startAnim.autoplay = false;
  
  textEntrance.offset = 500
  circleEntranceFx.offset = 500
  arcHighlightEffectIn.offset = 500
  startAnim.add([containerOut, arcEntrance, 
                 textEntrance, circleEntranceFx, arcHighlightEffectIn])
  
  arcHighlightEffectOut.offset = 0
  textEntrance.offset = 0
  circleEntranceFx.offset = 0
  arcHighlightEffectIn.offset = 0
  
  
  
  function debugAnim(testAnim) {
    testAnim = anime(testAnim)
    var seekProgressEl = document.querySelector('.progress');
    document.querySelector('.progress').oninput = function() {
      testAnim.seek(testAnim.duration * (seekProgressEl.value / 100));
    };
    document.querySelector('.play').onclick = testAnim.restart;
    document.querySelector('.pause').onclick = testAnim.pause;
  }
  
  
  function Simon() {
    var mode;
    var level;
    var levelMax = 20;
    var moves = [];
    var currentMove;
    var difficulty;
    var self = this
    
    this.begin = function(mode) {
      //moves = [0,3,2,1,2,2,2,3,1,2,3,2,1,0,3,0,2,3,1]
      //moves = [2,3,2,1,0,3,0,2,3,1]
      //moves = [0,1]
      moves = [];
      currentMove = 0;
      difficulty = mode;
      console.log(difficulty);
      startAnim.run = function(anim) {
        if (anim.currentTime > 300) {
          $(".container").html("<strong>" + (moves.length + 1) + "</strong>");
        }
      }
      startAnim.complete = function() {
        anime(arcOutlineHide);
        highlightArc(0,400);
        highlightArc(1,400);
        highlightArc(2,400);
        highlightArc(3,400);
        setTimeout(function() {
          self.aiTurn()
        }, 800)
      };
      startAnim.restart();
    }
    
    this.aiTurn = function(restart) {
      anime(arcOutlineHide);
      if(!restart) {
        moves.push(anime.random(0, 3))
      }
      level = moves.length;
      let currentAiMove = 0;
      let delay = level < 15 ? 1000 - (level * 50) : 250
      function loop(){
        if (currentAiMove < moves.length) {
          highlightArc(moves[currentAiMove], delay * 0.9);
          playSound(moves[currentAiMove], delay * 0.9);
          if (currentAiMove == 0) {
            innnerArcHighlight.staticIn(moves[currentAiMove], delay / 2);
          } else {
            innnerArcHighlight.highlight(moves[currentAiMove], delay / 2)
          }
          setTimeout(function() {
            currentAiMove++;
            loop();
          }, (delay + (delay / 2 < 200 ? delay / 2 : 200)))
        } else {
          setTimeout(function() {
            console.log("turn finished")
            anime(arcHighlightEffectOut);
            innnerArcHighlight.spinFade();
            setTimeout(self.playerTurn, 500)
          }, 300)
          

        }
      }
      loop();
    }
    
    this.aiTurnRestart = function() {
      anime(containerOut);
      console.log('restart')
      setTimeout(function() {
        anime(arcEntrance)
        innerDisplay.transitionlvl(level)
        console.log("FIN")
        setTimeout(function(){self.aiTurn(true)}, 1000)
      }, 600)
    }
    
    this.playerTurn = function() {
      currentMove = 0;
      addArcClickHandlers();
    }
    
    this.playerMove = function(arc) {
      if (arc != moves[currentMove]) {
        console.log("WRONG")
        anime(arcFadeExplode);
        anime(arcOutlineShow);
        anime(containerOut);
        innnerArcHighlight.fade();
        removeArcClickHandlers();
        setTimeout(function() {
            innerDisplay.wrongMove(difficulty);
        }, 1000)
      } else {
        currentMove++;
        if (currentMove == levelMax) {
          removeArcClickHandlers();
          anime(arcOutlineEntranceWin);
          anime(arcWinIntro);
          innnerArcHighlight.fade();
          setTimeout(function(){
            anime.remove(".arcFXouter");
            innerDisplay.transition('<h3 class="flex-item">Winner!</h3>' + 
            //'<h2 class="flex-item">&nbsp</h2>' +
            '<small id="hard" class="flex-item">reset</small>');
            anime.remove(".arcFX");
            anime(arcFxOuterWinIntro);
            setTimeout(function() {
              $("#hard").click(function () {
                $("#hard").off();
                reset();
              })
            }, 1000)
          }, 700);


        } else if (currentMove == level) {
          anime(arcFadeAway);
          anime(containerOut);
          innnerArcHighlight.fade();
          removeArcClickHandlers();
          setTimeout(function() {
            anime(arcEntrance)
            innerDisplay.transitionlvl(level + 1)
            console.log("FIN")
            setTimeout(self.aiTurn, 900)
          }, 600)
        }
      }
    }
    
    this.isLastMove = function() {
      return ((currentMove + 1) == levelMax);
    }
    
    
    
  }
  
  
  function removeArcClickHandlers() {
    $('.arcOL').off();
    $('.arcOL').removeClass('clickable');
    $(document).off();
  }
  
  function addArcClickHandlers() {
    $('.arcOL').addClass('clickable')
    $('.arcOL').click(function () {
      if(!simon.isLastMove()) {
        highlightArc(this.id.slice(-1), 200);
        playSound(this.id.slice(-1), 250);
        innnerArcHighlight.highlight(this.id.slice(-1))
      }
      simon.playerMove(this.id.slice(-1));
    })
    $('.arcOL').hover(function () {
      innnerArcHighlight.highlight(this.id.slice(-1))
    }, function () {
      innnerArcHighlight.fade()
    })
    $(document).on('keypress', function (e) {
      console.log(e.which);
      let arc = -1;
      switch(e.which) {
        case 73:
        case 105:
          arc = 0;
          break;
        case 79:
        case 111:
          arc = 1;
          break;
        case 76:
        case 108:
          arc = 2;
          break;
        case 75:
        case 107:
          arc = 3;
          break;
      }
      if (arc != -1) {
        if(!simon.isLastMove()) {
          highlightArc(arc, 200);
          innnerArcHighlight.highlight(arc)
          innnerArcHighlight.fadeKeypress();
        }
        simon.playerMove(arc);
      }
    })
  }
  
  function InnerDisplay() {
    var currentHTML = chooseDifficultyString;
    var setOnce = true;
    var self = this;

    this.chooseDifficulty = function() {
      playIntroSound();
      //$(".container").html(chooseDifficultyString);
      startScreenOut.reset();
      startScreenOut.restart();
      introSeq.reset();
      introSeq.restart();
      setTimeout(function(){self.transition(chooseDifficultyString)}, 1000);
      introSeq.complete = function() {
        $("#easy, #hard").click(function () {
          $("#easy, #hard").off();
          simon.begin(this.id);
        })
      }
    }
    
    this.transition = function(string, shrinkText) {
      if(shrinkText) {
        $(".container").addClass('containerSmallerFont')
      } else {
        $(".container").removeClass('containerSmallerFont')
      }
      $(".container").html(string);
      anime(circleEntranceFx)
      anime(textEntrance)
      anime(arcHighlightEffectIn)
    }
    
    this.transitionlvl = function(string) {
      self.transition("<strong>" + string + "</strong>")
    }
    
    this.wrongMove = function(difficulty) {
      $(".container").addClass('containerSmallerFont')
      self.transition('<h2 class="flex-item">Wrong!</h2><div id="easy" class="flex-item">' +
              (difficulty == 'easy' ? 'Continue' : 'Restart') +
            '</div><small class="flex-item">or</small>' +
            '<div id="hard" class="flex-item">Reset</div>', true)
      setTimeout(function() {
        $("#easy, #hard").click(function () {
          console.log("click")
          $("#easy, #hard").off();
          if (this.id == "easy") {
            if (difficulty == 'easy') {
              simon.aiTurnRestart();
            } else {
              simon.begin(this.id)
            }
          } else {
            reset();
          }
        })
      }, 1000)
    }
  }
  
  function InnnerArcHighlight() {
    var prevArc = 0;
    var baseRots = 0;
    var arcInnerHighlightRotateActive;
    var self = this;
    var fadeOnKeypressDelay = 500
    var fadeTimeout;
    
    
    this.highlight = function(arc, duration) {
      if (typeof arcInnerHighlightRotateActive !== 'undefined') {
        arcInnerHighlightRotateActive.pause();
      }
      
      if (typeof duration == 'undefined') {
        duration = 400;
      }
      
      if (typeof fadeTimeout !== 'undefined') {
        clearTimeout(fadeTimeout);
      }
      

      var temp = Object.assign({}, arcInnerHighlightRotate)
      if ((prevArc == 3 && arc <= 1) || (prevArc == 2 && arc == 0)) {
        baseRots += 1;
      } else if (prevArc == 0 && arc == 3) {
        baseRots -= 1;
      }

      prevArc = arc
      
      temp.duration = duration;
      temp.rotate = (arc * 90) + (baseRots * 360)
      temp.stroke = colors[arc]
      temp.delay = 0
      
      arcInnerHighlightRotateActive = anime(temp);
    }
    
    this.staticIn = function(arc, duration) {
      baseRots = 0
      if (typeof arcInnerHighlightRotateActive !== 'undefined') {
        arcInnerHighlightRotateActive.pause();
      }
      arcInnerHighlightRotateReset.rotation = arc * 90
      anime(arcInnerHighlightRotateReset);
      self.highlight(arc, duration);
    }
    
    this.fade = function() {
      arcInnerHighlightRotateOut.complete = function () {
        baseRots = 0;
        anime({targets: '#arcFX0', rotate: 0, duration: 10});
      }
      
      arcInnerHighlightRotateActive.pause();
      arcInnerHighlightRotateOut.rotate = (prevArc * 90) + (baseRots * 360)
      arcInnerHighlightRotateActive = anime(arcInnerHighlightRotateOut)
    }
    
    this.fadeKeypress = function() {
      
      fadeTimeout = setTimeout(function() {
        self.fade();
      }, fadeOnKeypressDelay)
    }
    
    this.spinFade = function () {
      baseRots+= 1
      self.fade();
    }
  }

  
  function highlightArc(arc, duration) {
    var $arc;

    if (typeof arc !== 'undefined') {
      $arc = $('#arc' + arc)
      arcHighlightFx.targets = '#arcFXouter' + arc
      arcHighlightFx.stroke = ["#FFF", colors[arc]]
      arcHighlightFx.duration = duration * 3
      anime(arcHighlightFx);
    } else {
      $arc = $('.arc');
    }
    
    $arc.addClass('active')
    setTimeout(function () {
      $arc.removeClass('active');
    }, duration);
    //arcHighlightFx.restart();
    
  }
  
  function playSound(arc, duration) {
    arcSound[arc].play();
    setTimeout(function () {
      arcSound[arc].stop();
    }, duration)
  }
  
  function reset() {
    anime.remove(".arc");
    anime.remove(".arcFX");
    anime.remove(".arcFXouter");
    anime.remove(".arcOL");
    $(".startScreen").one("click", innerDisplay.chooseDifficulty)
    $(".startScreen").css("visibility", "visible"); 
    $(".container").css("visibility", "hidden"); 
    startScreenOut.reset();
    introSeq.reset();
    startAnim.reset();
  }
  
  var simon = new Simon();
  var innnerArcHighlight = new InnnerArcHighlight();
  var innerDisplay = new InnerDisplay();
  
  
  
  debugAnim(arcHighlightEffectOut)
  $(".startScreen").one("click", innerDisplay.chooseDifficulty)
  $(".reset").click(function(){reset()})
  
  
  
  anime.speed = 1;
  
})