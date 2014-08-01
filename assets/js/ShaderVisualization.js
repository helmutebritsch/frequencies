/*
Florian Wokurka (2014)
https://github.com/frequencies
*/

"use strict"

define([
  'assets/js/Visualization.js',
  'text!fragmentShader/FS_01.glsl',
  'text!vertexShader/VS_01.glsl'
  ], function(
    Visualization,
    fragmentShader,
    vertexShader
  ) {

var ShaderVisualization, _ref, module,


  module = function() {}
  ShaderVisualization = (function(_super){
    __extends(ShaderVisualization, Visualization);
// --------------------------------------


    function ShaderVisualization(containerIdentifier, musicPlayer, effects){ 
      ShaderVisualization.__super__.constructor(containerIdentifier, musicPlayer, effects)

      this.initUniforms()
      this.initialize()
      this.activateResizeListener()
      this.start()  
    }

    ShaderVisualization.prototype.resize = function(){
        this.uniforms.resolution.value.x = window.innerWidth;
        this.uniforms.resolution.value.y = window.innerHeight;

        this.renderer.setSize( window.innerWidth, window.innerHeight );
    }

    ShaderVisualization.prototype.initUniforms = function(){
      this.uniforms = {
        volume: { type: "f", value: this.musicPlayer.getVolume() },
        time: { type: "f", value: 1.0 },
        resolution: { type: "v2", value: new THREE.Vector2() }
      }

      this.uniforms.resolution.value.x = window.innerWidth
      this.uniforms.resolution.value.y = window.innerHeight
    }

    ShaderVisualization.prototype.initRenderer = function(){

      if(!!this.canvas)
        this.canvas.remove()

      var rendererOptions = {
          antialias: true
        , 
      }

      this.renderer = new THREE.WebGLRenderer(rendererOptions)
      this.renderer.setSize(window.innerWidth, window.innerHeight)

      this.canvas = this.renderer.domElement
      this.canvas.id = "the-canvas"
      this.container.append($(this.canvas))
    }

    ShaderVisualization.prototype.initScene = function(){

      this.scene = new THREE.Scene()
      this.camera = new THREE.PerspectiveCamera(
          70 // angle
        , window.innerWidth / window.innerHeight // ratio
        , 10 // near plane
        , 1000 // far plane
        )
      this.camera.position.z = 100

      this.scene.add(this.camera)
    } 

    ShaderVisualization.prototype.addSceneObjects = function(){

        this.geometry = new THREE.PlaneGeometry( 2, 2 );

        var material = new THREE.ShaderMaterial( {
          uniforms: this.uniforms,
          vertexShader: vertexShader,
          fragmentShader: fragmentShader
        } );

        var mesh = new THREE.Mesh( this.geometry, material );
        this.scene.add( mesh );      
    }
       
    ShaderVisualization.prototype.updateScene = function(){
      this.uniforms.time.value += 0.05
      this.uniforms.volume.value = this.musicPlayer.getVolume()
    }   


    ShaderVisualization.prototype.getGeometryVertices = function(){
      return this.geometry.vertices;
    }



// --------------------------------------
    return ShaderVisualization
  })()
  return module.exports = ShaderVisualization
})