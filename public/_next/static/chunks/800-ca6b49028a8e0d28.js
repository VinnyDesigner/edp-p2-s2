"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[800],{3464:(e,r,t)=>{t.d(r,{X:()=>s});var i=t(5339),o=t(3617);let a={name:"OutputShader",uniforms:{tDiffuse:{value:null},toneMappingExposure:{value:1}},vertexShader:`
		precision highp float;

		uniform mat4 modelViewMatrix;
		uniform mat4 projectionMatrix;

		attribute vec3 position;
		attribute vec2 uv;

		varying vec2 vUv;

		void main() {

			vUv = uv;
			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		precision highp float;

		uniform sampler2D tDiffuse;

		#include <tonemapping_pars_fragment>
		#include <colorspace_pars_fragment>

		varying vec2 vUv;

		void main() {

			gl_FragColor = texture2D( tDiffuse, vUv );

			// tone mapping

			#ifdef LINEAR_TONE_MAPPING

				gl_FragColor.rgb = LinearToneMapping( gl_FragColor.rgb );

			#elif defined( REINHARD_TONE_MAPPING )

				gl_FragColor.rgb = ReinhardToneMapping( gl_FragColor.rgb );

			#elif defined( CINEON_TONE_MAPPING )

				gl_FragColor.rgb = CineonToneMapping( gl_FragColor.rgb );

			#elif defined( ACES_FILMIC_TONE_MAPPING )

				gl_FragColor.rgb = ACESFilmicToneMapping( gl_FragColor.rgb );

			#elif defined( AGX_TONE_MAPPING )

				gl_FragColor.rgb = AgXToneMapping( gl_FragColor.rgb );

			#elif defined( NEUTRAL_TONE_MAPPING )

				gl_FragColor.rgb = NeutralToneMapping( gl_FragColor.rgb );

			#elif defined( CUSTOM_TONE_MAPPING )

				gl_FragColor.rgb = CustomToneMapping( gl_FragColor.rgb );

			#endif

			// color space

			#ifdef SRGB_TRANSFER

				gl_FragColor = sRGBTransferOETF( gl_FragColor );

			#endif

		}`};class s extends o.o{constructor(){super(),this.isOutputPass=!0,this.uniforms=i.LlO.clone(a.uniforms),this.material=new i.D$Q({name:a.name,uniforms:this.uniforms,vertexShader:a.vertexShader,fragmentShader:a.fragmentShader}),this._fsQuad=new o.F(this.material),this._outputColorSpace=null,this._toneMapping=null}render(e,r,t){this.uniforms.tDiffuse.value=t.texture,this.uniforms.toneMappingExposure.value=e.toneMappingExposure,(this._outputColorSpace!==e.outputColorSpace||this._toneMapping!==e.toneMapping)&&(this._outputColorSpace=e.outputColorSpace,this._toneMapping=e.toneMapping,this.material.defines={},i.ppV.getTransfer(this._outputColorSpace)===i.KLL&&(this.material.defines.SRGB_TRANSFER=""),this._toneMapping===i.kyO?this.material.defines.LINEAR_TONE_MAPPING="":this._toneMapping===i.Mjd?this.material.defines.REINHARD_TONE_MAPPING="":this._toneMapping===i.nNL?this.material.defines.CINEON_TONE_MAPPING="":this._toneMapping===i.FV?this.material.defines.ACES_FILMIC_TONE_MAPPING="":this._toneMapping===i.LAk?this.material.defines.AGX_TONE_MAPPING="":this._toneMapping===i.aJ8?this.material.defines.NEUTRAL_TONE_MAPPING="":this._toneMapping===i.g7M&&(this.material.defines.CUSTOM_TONE_MAPPING=""),this.material.needsUpdate=!0),!0===this.renderToScreen?e.setRenderTarget(null):(e.setRenderTarget(r),this.clear&&e.clear(e.autoClearColor,e.autoClearDepth,e.autoClearStencil)),this._fsQuad.render(e)}dispose(){this.material.dispose(),this._fsQuad.dispose()}}},8832:(e,r,t)=>{t.d(r,{C:()=>l});var i=t(5339),o=t(3617),a=t(2049);let s={name:"LuminosityHighPassShader",uniforms:{tDiffuse:{value:null},luminosityThreshold:{value:1},smoothWidth:{value:1},defaultColor:{value:new i.Q1f(0)},defaultOpacity:{value:0}},vertexShader:`

		varying vec2 vUv;

		void main() {

			vUv = uv;

			gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

		}`,fragmentShader:`

		uniform sampler2D tDiffuse;
		uniform vec3 defaultColor;
		uniform float defaultOpacity;
		uniform float luminosityThreshold;
		uniform float smoothWidth;

		varying vec2 vUv;

		void main() {

			vec4 texel = texture2D( tDiffuse, vUv );

			float v = luminance( texel.xyz );

			vec4 outputColor = vec4( defaultColor.rgb, defaultOpacity );

			float alpha = smoothstep( luminosityThreshold, luminosityThreshold + smoothWidth, v );

			gl_FragColor = mix( outputColor, texel, alpha );

		}`};class l extends o.o{constructor(e,r=1,t,l){super(),this.strength=r,this.radius=t,this.threshold=l,this.resolution=void 0!==e?new i.I9Y(e.x,e.y):new i.I9Y(256,256),this.clearColor=new i.Q1f(0,0,0),this.needsSwap=!1,this.renderTargetsHorizontal=[],this.renderTargetsVertical=[],this.nMips=5;let n=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);this.renderTargetBright=new i.nWS(n,u,{type:i.ix0}),this.renderTargetBright.texture.name="UnrealBloomPass.bright",this.renderTargetBright.texture.generateMipmaps=!1;for(let e=0;e<this.nMips;e++){let r=new i.nWS(n,u,{type:i.ix0});r.texture.name="UnrealBloomPass.h"+e,r.texture.generateMipmaps=!1,this.renderTargetsHorizontal.push(r);let t=new i.nWS(n,u,{type:i.ix0});t.texture.name="UnrealBloomPass.v"+e,t.texture.generateMipmaps=!1,this.renderTargetsVertical.push(t),n=Math.round(n/2),u=Math.round(u/2)}this.highPassUniforms=i.LlO.clone(s.uniforms),this.highPassUniforms.luminosityThreshold.value=l,this.highPassUniforms.smoothWidth.value=.01,this.materialHighPassFilter=new i.BKk({uniforms:this.highPassUniforms,vertexShader:s.vertexShader,fragmentShader:s.fragmentShader}),this.separableBlurMaterials=[];let h=[6,10,14,18,22];n=Math.round(this.resolution.x/2),u=Math.round(this.resolution.y/2);for(let e=0;e<this.nMips;e++)this.separableBlurMaterials.push(this._getSeparableBlurMaterial(h[e])),this.separableBlurMaterials[e].uniforms.invSize.value=new i.I9Y(1/n,1/u),n=Math.round(n/2),u=Math.round(u/2);this.compositeMaterial=this._getCompositeMaterial(this.nMips),this.compositeMaterial.uniforms.blurTexture1.value=this.renderTargetsVertical[0].texture,this.compositeMaterial.uniforms.blurTexture2.value=this.renderTargetsVertical[1].texture,this.compositeMaterial.uniforms.blurTexture3.value=this.renderTargetsVertical[2].texture,this.compositeMaterial.uniforms.blurTexture4.value=this.renderTargetsVertical[3].texture,this.compositeMaterial.uniforms.blurTexture5.value=this.renderTargetsVertical[4].texture,this.compositeMaterial.uniforms.bloomStrength.value=r,this.compositeMaterial.uniforms.bloomRadius.value=.1,this.compositeMaterial.uniforms.bloomFactors.value=[1,.8,.6,.4,.2],this.bloomTintColors=[new i.Pq0(1,1,1),new i.Pq0(1,1,1),new i.Pq0(1,1,1),new i.Pq0(1,1,1),new i.Pq0(1,1,1)],this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,this.copyUniforms=i.LlO.clone(a.Z.uniforms),this.blendMaterial=new i.BKk({uniforms:this.copyUniforms,vertexShader:a.Z.vertexShader,fragmentShader:a.Z.fragmentShader,premultipliedAlpha:!0,blending:i.EZo,depthTest:!1,depthWrite:!1,transparent:!0}),this._oldClearColor=new i.Q1f,this._oldClearAlpha=1,this._basic=new i.V9B,this._fsQuad=new o.F(null)}dispose(){for(let e=0;e<this.renderTargetsHorizontal.length;e++)this.renderTargetsHorizontal[e].dispose();for(let e=0;e<this.renderTargetsVertical.length;e++)this.renderTargetsVertical[e].dispose();this.renderTargetBright.dispose();for(let e=0;e<this.separableBlurMaterials.length;e++)this.separableBlurMaterials[e].dispose();this.compositeMaterial.dispose(),this.blendMaterial.dispose(),this._basic.dispose(),this._fsQuad.dispose()}setSize(e,r){let t=Math.round(e/2),o=Math.round(r/2);this.renderTargetBright.setSize(t,o);for(let e=0;e<this.nMips;e++)this.renderTargetsHorizontal[e].setSize(t,o),this.renderTargetsVertical[e].setSize(t,o),this.separableBlurMaterials[e].uniforms.invSize.value=new i.I9Y(1/t,1/o),t=Math.round(t/2),o=Math.round(o/2)}render(e,r,t,i,o){e.getClearColor(this._oldClearColor),this._oldClearAlpha=e.getClearAlpha();let a=e.autoClear;e.autoClear=!1,e.setClearColor(this.clearColor,0),o&&e.state.buffers.stencil.setTest(!1),this.renderToScreen&&(this._fsQuad.material=this._basic,this._basic.map=t.texture,e.setRenderTarget(null),e.clear(),this._fsQuad.render(e)),this.highPassUniforms.tDiffuse.value=t.texture,this.highPassUniforms.luminosityThreshold.value=this.threshold,this._fsQuad.material=this.materialHighPassFilter,e.setRenderTarget(this.renderTargetBright),e.clear(),this._fsQuad.render(e);let s=this.renderTargetBright;for(let r=0;r<this.nMips;r++)this._fsQuad.material=this.separableBlurMaterials[r],this.separableBlurMaterials[r].uniforms.colorTexture.value=s.texture,this.separableBlurMaterials[r].uniforms.direction.value=l.BlurDirectionX,e.setRenderTarget(this.renderTargetsHorizontal[r]),e.clear(),this._fsQuad.render(e),this.separableBlurMaterials[r].uniforms.colorTexture.value=this.renderTargetsHorizontal[r].texture,this.separableBlurMaterials[r].uniforms.direction.value=l.BlurDirectionY,e.setRenderTarget(this.renderTargetsVertical[r]),e.clear(),this._fsQuad.render(e),s=this.renderTargetsVertical[r];this._fsQuad.material=this.compositeMaterial,this.compositeMaterial.uniforms.bloomStrength.value=this.strength,this.compositeMaterial.uniforms.bloomRadius.value=this.radius,this.compositeMaterial.uniforms.bloomTintColors.value=this.bloomTintColors,e.setRenderTarget(this.renderTargetsHorizontal[0]),e.clear(),this._fsQuad.render(e),this._fsQuad.material=this.blendMaterial,this.copyUniforms.tDiffuse.value=this.renderTargetsHorizontal[0].texture,o&&e.state.buffers.stencil.setTest(!0),this.renderToScreen?e.setRenderTarget(null):e.setRenderTarget(t),this._fsQuad.render(e),e.setClearColor(this._oldClearColor,this._oldClearAlpha),e.autoClear=a}_getSeparableBlurMaterial(e){let r=[],t=e/3;for(let i=0;i<e;i++)r.push(.39894*Math.exp(-.5*i*i/(t*t))/t);return new i.BKk({defines:{KERNEL_RADIUS:e},uniforms:{colorTexture:{value:null},invSize:{value:new i.I9Y(.5,.5)},direction:{value:new i.I9Y(.5,.5)},gaussianCoefficients:{value:r}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				#include <common>

				varying vec2 vUv;

				uniform sampler2D colorTexture;
				uniform vec2 invSize;
				uniform vec2 direction;
				uniform float gaussianCoefficients[KERNEL_RADIUS];

				void main() {

					float weightSum = gaussianCoefficients[0];
					vec3 diffuseSum = texture2D( colorTexture, vUv ).rgb * weightSum;

					for ( int i = 1; i < KERNEL_RADIUS; i ++ ) {

						float x = float( i );
						float w = gaussianCoefficients[i];
						vec2 uvOffset = direction * invSize * x;
						vec3 sample1 = texture2D( colorTexture, vUv + uvOffset ).rgb;
						vec3 sample2 = texture2D( colorTexture, vUv - uvOffset ).rgb;
						diffuseSum += ( sample1 + sample2 ) * w;

					}

					gl_FragColor = vec4( diffuseSum, 1.0 );

				}`})}_getCompositeMaterial(e){return new i.BKk({defines:{NUM_MIPS:e},uniforms:{blurTexture1:{value:null},blurTexture2:{value:null},blurTexture3:{value:null},blurTexture4:{value:null},blurTexture5:{value:null},bloomStrength:{value:1},bloomFactors:{value:null},bloomTintColors:{value:null},bloomRadius:{value:0}},vertexShader:`

				varying vec2 vUv;

				void main() {

					vUv = uv;
					gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );

				}`,fragmentShader:`

				varying vec2 vUv;

				uniform sampler2D blurTexture1;
				uniform sampler2D blurTexture2;
				uniform sampler2D blurTexture3;
				uniform sampler2D blurTexture4;
				uniform sampler2D blurTexture5;
				uniform float bloomStrength;
				uniform float bloomRadius;
				uniform float bloomFactors[NUM_MIPS];
				uniform vec3 bloomTintColors[NUM_MIPS];

				float lerpBloomFactor( const in float factor ) {

					float mirrorFactor = 1.2 - factor;
					return mix( factor, mirrorFactor, bloomRadius );

				}

				void main() {

					// 3.0 for backwards compatibility with previous alpha-based intensity
					vec3 bloom = 3.0 * bloomStrength * (
						lerpBloomFactor( bloomFactors[ 0 ] ) * bloomTintColors[ 0 ] * texture2D( blurTexture1, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 1 ] ) * bloomTintColors[ 1 ] * texture2D( blurTexture2, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 2 ] ) * bloomTintColors[ 2 ] * texture2D( blurTexture3, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 3 ] ) * bloomTintColors[ 3 ] * texture2D( blurTexture4, vUv ).rgb +
						lerpBloomFactor( bloomFactors[ 4 ] ) * bloomTintColors[ 4 ] * texture2D( blurTexture5, vUv ).rgb
					);

					float bloomAlpha = max( bloom.r, max( bloom.g, bloom.b ) );
					gl_FragColor = vec4( bloom, bloomAlpha );

				}`})}}l.BlurDirectionX=new i.I9Y(1,0),l.BlurDirectionY=new i.I9Y(0,1)}}]);