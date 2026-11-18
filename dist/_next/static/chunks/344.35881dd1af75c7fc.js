"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[344],{473:(e,t,i)=>{i.d(t,{G:()=>a});var n=i(7548),r=i(5339);n.UniformsLib.line={worldUnits:{value:1},linewidth:{value:1},resolution:{value:new r.I9Y(1,1)},dashOffset:{value:0},dashScale:{value:1},dashSize:{value:1},gapSize:{value:1}},n.ShaderLib.line={uniforms:r.LlO.merge([n.UniformsLib.common,n.UniformsLib.fog,n.UniformsLib.line]),vertexShader:`
		#include <common>
		#include <color_pars_vertex>
		#include <fog_pars_vertex>
		#include <logdepthbuf_pars_vertex>
		#include <clipping_planes_pars_vertex>

		uniform float linewidth;
		uniform vec2 resolution;

		attribute vec3 instanceStart;
		attribute vec3 instanceEnd;

		attribute vec3 instanceColorStart;
		attribute vec3 instanceColorEnd;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#ifdef USE_DASH

			uniform float dashScale;
			attribute float instanceDistanceStart;
			attribute float instanceDistanceEnd;
			varying float vLineDistance;

		#endif

		void trimSegment( const in vec4 start, inout vec4 end ) {

			// trim end segment so it terminates between the camera plane and the near plane

			// conservative estimate of the near plane
			float a = projectionMatrix[ 2 ][ 2 ]; // 3nd entry in 3th column
			float b = projectionMatrix[ 3 ][ 2 ]; // 3nd entry in 4th column
			float nearEstimate = - 0.5 * b / a;

			float alpha = ( nearEstimate - start.z ) / ( end.z - start.z );

			end.xyz = mix( start.xyz, end.xyz, alpha );

		}

		void main() {

			#ifdef USE_COLOR

				vColor.xyz = ( position.y < 0.5 ) ? instanceColorStart : instanceColorEnd;

			#endif

			#ifdef USE_DASH

				vLineDistance = ( position.y < 0.5 ) ? dashScale * instanceDistanceStart : dashScale * instanceDistanceEnd;
				vUv = uv;

			#endif

			float aspect = resolution.x / resolution.y;

			// camera space
			vec4 start = modelViewMatrix * vec4( instanceStart, 1.0 );
			vec4 end = modelViewMatrix * vec4( instanceEnd, 1.0 );

			#ifdef WORLD_UNITS

				worldStart = start.xyz;
				worldEnd = end.xyz;

			#else

				vUv = uv;

			#endif

			// special case for perspective projection, and segments that terminate either in, or behind, the camera plane
			// clearly the gpu firmware has a way of addressing this issue when projecting into ndc space
			// but we need to perform ndc-space calculations in the shader, so we must address this issue directly
			// perhaps there is a more elegant solution -- WestLangley

			bool perspective = ( projectionMatrix[ 2 ][ 3 ] == - 1.0 ); // 4th entry in the 3rd column

			if ( perspective ) {

				if ( start.z < 0.0 && end.z >= 0.0 ) {

					trimSegment( start, end );

				} else if ( end.z < 0.0 && start.z >= 0.0 ) {

					trimSegment( end, start );

				}

			}

			// clip space
			vec4 clipStart = projectionMatrix * start;
			vec4 clipEnd = projectionMatrix * end;

			// ndc space
			vec3 ndcStart = clipStart.xyz / clipStart.w;
			vec3 ndcEnd = clipEnd.xyz / clipEnd.w;

			// direction
			vec2 dir = ndcEnd.xy - ndcStart.xy;

			// account for clip-space aspect ratio
			dir.x *= aspect;
			dir = normalize( dir );

			#ifdef WORLD_UNITS

				vec3 worldDir = normalize( end.xyz - start.xyz );
				vec3 tmpFwd = normalize( mix( start.xyz, end.xyz, 0.5 ) );
				vec3 worldUp = normalize( cross( worldDir, tmpFwd ) );
				vec3 worldFwd = cross( worldDir, worldUp );
				worldPos = position.y < 0.5 ? start: end;

				// height offset
				float hw = linewidth * 0.5;
				worldPos.xyz += position.x < 0.0 ? hw * worldUp : - hw * worldUp;

				// don't extend the line if we're rendering dashes because we
				// won't be rendering the endcaps
				#ifndef USE_DASH

					// cap extension
					worldPos.xyz += position.y < 0.5 ? - hw * worldDir : hw * worldDir;

					// add width to the box
					worldPos.xyz += worldFwd * hw;

					// endcaps
					if ( position.y > 1.0 || position.y < 0.0 ) {

						worldPos.xyz -= worldFwd * 2.0 * hw;

					}

				#endif

				// project the worldpos
				vec4 clip = projectionMatrix * worldPos;

				// shift the depth of the projected points so the line
				// segments overlap neatly
				vec3 clipPose = ( position.y < 0.5 ) ? ndcStart : ndcEnd;
				clip.z = clipPose.z * clip.w;

			#else

				vec2 offset = vec2( dir.y, - dir.x );
				// undo aspect ratio adjustment
				dir.x /= aspect;
				offset.x /= aspect;

				// sign flip
				if ( position.x < 0.0 ) offset *= - 1.0;

				// endcaps
				if ( position.y < 0.0 ) {

					offset += - dir;

				} else if ( position.y > 1.0 ) {

					offset += dir;

				}

				// adjust for linewidth
				offset *= linewidth;

				// adjust for clip-space to screen-space conversion // maybe resolution should be based on viewport ...
				offset /= resolution.y;

				// select end
				vec4 clip = ( position.y < 0.5 ) ? clipStart : clipEnd;

				// back to clip space
				offset *= clip.w;

				clip.xy += offset;

			#endif

			gl_Position = clip;

			vec4 mvPosition = ( position.y < 0.5 ) ? start : end; // this is an approximation

			#include <logdepthbuf_vertex>
			#include <clipping_planes_vertex>
			#include <fog_vertex>

		}
		`,fragmentShader:`
		uniform vec3 diffuse;
		uniform float opacity;
		uniform float linewidth;

		#ifdef USE_DASH

			uniform float dashOffset;
			uniform float dashSize;
			uniform float gapSize;

		#endif

		varying float vLineDistance;

		#ifdef WORLD_UNITS

			varying vec4 worldPos;
			varying vec3 worldStart;
			varying vec3 worldEnd;

			#ifdef USE_DASH

				varying vec2 vUv;

			#endif

		#else

			varying vec2 vUv;

		#endif

		#include <common>
		#include <color_pars_fragment>
		#include <fog_pars_fragment>
		#include <logdepthbuf_pars_fragment>
		#include <clipping_planes_pars_fragment>

		vec2 closestLineToLine(vec3 p1, vec3 p2, vec3 p3, vec3 p4) {

			float mua;
			float mub;

			vec3 p13 = p1 - p3;
			vec3 p43 = p4 - p3;

			vec3 p21 = p2 - p1;

			float d1343 = dot( p13, p43 );
			float d4321 = dot( p43, p21 );
			float d1321 = dot( p13, p21 );
			float d4343 = dot( p43, p43 );
			float d2121 = dot( p21, p21 );

			float denom = d2121 * d4343 - d4321 * d4321;

			float numer = d1343 * d4321 - d1321 * d4343;

			mua = numer / denom;
			mua = clamp( mua, 0.0, 1.0 );
			mub = ( d1343 + d4321 * ( mua ) ) / d4343;
			mub = clamp( mub, 0.0, 1.0 );

			return vec2( mua, mub );

		}

		void main() {

			float alpha = opacity;
			vec4 diffuseColor = vec4( diffuse, alpha );

			#include <clipping_planes_fragment>

			#ifdef USE_DASH

				if ( vUv.y < - 1.0 || vUv.y > 1.0 ) discard; // discard endcaps

				if ( mod( vLineDistance + dashOffset, dashSize + gapSize ) > dashSize ) discard; // todo - FIX

			#endif

			#ifdef WORLD_UNITS

				// Find the closest points on the view ray and the line segment
				vec3 rayEnd = normalize( worldPos.xyz ) * 1e5;
				vec3 lineDir = worldEnd - worldStart;
				vec2 params = closestLineToLine( worldStart, worldEnd, vec3( 0.0, 0.0, 0.0 ), rayEnd );

				vec3 p1 = worldStart + lineDir * params.x;
				vec3 p2 = rayEnd * params.y;
				vec3 delta = p1 - p2;
				float len = length( delta );
				float norm = len / linewidth;

				#ifndef USE_DASH

					#ifdef USE_ALPHA_TO_COVERAGE

						float dnorm = fwidth( norm );
						alpha = 1.0 - smoothstep( 0.5 - dnorm, 0.5 + dnorm, norm );

					#else

						if ( norm > 0.5 ) {

							discard;

						}

					#endif

				#endif

			#else

				#ifdef USE_ALPHA_TO_COVERAGE

					// artifacts appear on some hardware if a derivative is taken within a conditional
					float a = vUv.x;
					float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
					float len2 = a * a + b * b;
					float dlen = fwidth( len2 );

					if ( abs( vUv.y ) > 1.0 ) {

						alpha = 1.0 - smoothstep( 1.0 - dlen, 1.0 + dlen, len2 );

					}

				#else

					if ( abs( vUv.y ) > 1.0 ) {

						float a = vUv.x;
						float b = ( vUv.y > 0.0 ) ? vUv.y - 1.0 : vUv.y + 1.0;
						float len2 = a * a + b * b;

						if ( len2 > 1.0 ) discard;

					}

				#endif

			#endif

			#include <logdepthbuf_fragment>
			#include <color_fragment>

			gl_FragColor = vec4( diffuseColor.rgb, alpha );

			#include <tonemapping_fragment>
			#include <colorspace_fragment>
			#include <fog_fragment>
			#include <premultiplied_alpha_fragment>

		}
		`};class a extends r.BKk{constructor(e){super({type:"LineMaterial",uniforms:r.LlO.clone(n.ShaderLib.line.uniforms),vertexShader:n.ShaderLib.line.vertexShader,fragmentShader:n.ShaderLib.line.fragmentShader,clipping:!0}),this.isLineMaterial=!0,this.setValues(e)}get color(){return this.uniforms.diffuse.value}set color(e){this.uniforms.diffuse.value=e}get worldUnits(){return"WORLD_UNITS"in this.defines}set worldUnits(e){!0===e!==this.worldUnits&&(this.needsUpdate=!0),!0===e?this.defines.WORLD_UNITS="":delete this.defines.WORLD_UNITS}get linewidth(){return this.uniforms.linewidth.value}set linewidth(e){this.uniforms.linewidth&&(this.uniforms.linewidth.value=e)}get dashed(){return"USE_DASH"in this.defines}set dashed(e){!0===e!==this.dashed&&(this.needsUpdate=!0),!0===e?this.defines.USE_DASH="":delete this.defines.USE_DASH}get dashScale(){return this.uniforms.dashScale.value}set dashScale(e){this.uniforms.dashScale.value=e}get dashSize(){return this.uniforms.dashSize.value}set dashSize(e){this.uniforms.dashSize.value=e}get dashOffset(){return this.uniforms.dashOffset.value}set dashOffset(e){this.uniforms.dashOffset.value=e}get gapSize(){return this.uniforms.gapSize.value}set gapSize(e){this.uniforms.gapSize.value=e}get opacity(){return this.uniforms.opacity.value}set opacity(e){this.uniforms&&(this.uniforms.opacity.value=e)}get resolution(){return this.uniforms.resolution.value}set resolution(e){this.uniforms.resolution.value.copy(e)}get alphaToCoverage(){return"USE_ALPHA_TO_COVERAGE"in this.defines}set alphaToCoverage(e){this.defines&&(!0===e!==this.alphaToCoverage&&(this.needsUpdate=!0),!0===e?this.defines.USE_ALPHA_TO_COVERAGE="":delete this.defines.USE_ALPHA_TO_COVERAGE)}}},1813:(e,t,i)=>{i.d(t,{d:()=>a});var n=i(5339),r=i(3617);class a{constructor(e,t,i){this.variables=[],this.currentTextureIndex=0;let a=n.RQf,s={passThruTexture:{value:null}},o=u("uniform sampler2D passThruTexture;\n\nvoid main() {\n\n	vec2 uv = gl_FragCoord.xy / resolution.xy;\n\n	gl_FragColor = texture2D( passThruTexture, uv );\n\n}\n",s),l=new r.F(o);function d(i){i.defines.resolution="vec2( "+e.toFixed(1)+", "+t.toFixed(1)+" )"}function u(e,t){t=t||{};let i=new n.BKk({name:"GPUComputationShader",uniforms:t,vertexShader:"void main()	{\n\n	gl_Position = vec4( position, 1.0 );\n\n}\n",fragmentShader:e});return d(i),i}this.setDataType=function(e){return a=e,this},this.addVariable=function(e,t,i){let r={name:e,initialValueTexture:i,material:this.createShaderMaterial(t),dependencies:null,renderTargets:[],wrapS:null,wrapT:null,minFilter:n.hxR,magFilter:n.hxR};return this.variables.push(r),r},this.setVariableDependencies=function(e,t){e.dependencies=t},this.init=function(){if(0===i.capabilities.maxVertexTextures)return"No support for vertex shader textures.";for(let i=0;i<this.variables.length;i++){let n=this.variables[i];n.renderTargets[0]=this.createRenderTarget(e,t,n.wrapS,n.wrapT,n.minFilter,n.magFilter),n.renderTargets[1]=this.createRenderTarget(e,t,n.wrapS,n.wrapT,n.minFilter,n.magFilter),this.renderTexture(n.initialValueTexture,n.renderTargets[0]),this.renderTexture(n.initialValueTexture,n.renderTargets[1]);let r=n.material,a=r.uniforms;if(null!==n.dependencies)for(let e=0;e<n.dependencies.length;e++){let t=n.dependencies[e];if(t.name!==n.name){let e=!1;for(let i=0;i<this.variables.length;i++)if(t.name===this.variables[i].name){e=!0;break}if(!e)return"Variable dependency not found. Variable="+n.name+", dependency="+t.name}a[t.name]={value:null},r.fragmentShader="\nuniform sampler2D "+t.name+";\n"+r.fragmentShader}}return this.currentTextureIndex=0,null},this.compute=function(){let e=this.currentTextureIndex,t=+(0===this.currentTextureIndex);for(let i=0,n=this.variables.length;i<n;i++){let n=this.variables[i];if(null!==n.dependencies){let t=n.material.uniforms;for(let i=0,r=n.dependencies.length;i<r;i++){let r=n.dependencies[i];t[r.name].value=r.renderTargets[e].texture}}this.doRenderTarget(n.material,n.renderTargets[t])}this.currentTextureIndex=t},this.getCurrentRenderTarget=function(e){return e.renderTargets[this.currentTextureIndex]},this.getAlternateRenderTarget=function(e){return e.renderTargets[+(0===this.currentTextureIndex)]},this.dispose=function(){l.dispose();let e=this.variables;for(let t=0;t<e.length;t++){let i=e[t];i.initialValueTexture&&i.initialValueTexture.dispose();let n=i.renderTargets;for(let e=0;e<n.length;e++)n[e].dispose()}},this.addResolutionDefine=d,this.createShaderMaterial=u,this.createRenderTarget=function(i,r,s,o,l,d){return i=i||e,r=r||t,s=s||n.ghU,o=o||n.ghU,l=l||n.hxR,d=d||n.hxR,new n.nWS(i,r,{wrapS:s,wrapT:o,minFilter:l,magFilter:d,format:n.GWd,type:a,depthBuffer:!1})},this.createTexture=function(){let i=new Float32Array(e*t*4),r=new n.GYF(i,e,t,n.GWd,n.RQf);return r.needsUpdate=!0,r},this.renderTexture=function(e,t){s.passThruTexture.value=e,this.doRenderTarget(o,t),s.passThruTexture.value=null},this.doRenderTarget=function(e,t){let n=i.getRenderTarget(),r=i.xr.enabled,a=i.shadowMap.autoUpdate;i.xr.enabled=!1,i.shadowMap.autoUpdate=!1,l.material=e,i.setRenderTarget(t),l.render(i),l.material=o,i.xr.enabled=r,i.shadowMap.autoUpdate=a,i.setRenderTarget(n)}}}},2324:(e,t,i)=>{i.d(t,{_:()=>n});function n(e,t){if(t.has(e))throw TypeError("Cannot initialize the same private elements twice on an object");t.add(e)}},4956:(e,t,i)=>{let n,r;i.d(t,{b:()=>b});var a=i(5339),s=i(5330),o=i(473);let l=new a.IUQ,d=new a.Pq0,u=new a.Pq0,c=new a.IUQ,f=new a.IUQ,p=new a.IUQ,h=new a.Pq0,m=new a.kn4,v=new a.cZY,g=new a.Pq0,x=new a.NRn,w=new a.iyt,y=new a.IUQ;function S(e,t,i){return y.set(0,0,-t,1).applyMatrix4(e.projectionMatrix),y.multiplyScalar(1/y.w),y.x=r/i.width,y.y=r/i.height,y.applyMatrix4(e.projectionMatrixInverse),y.multiplyScalar(1/y.w),Math.abs(Math.max(y.x,y.y))}class b extends a.eaF{constructor(e=new s.n,t=new o.G({color:0xffffff*Math.random()})){super(e,t),this.isLineSegments2=!0,this.type="LineSegments2"}computeLineDistances(){let e=this.geometry,t=e.attributes.instanceStart,i=e.attributes.instanceEnd,n=new Float32Array(2*t.count);for(let e=0,r=0,a=t.count;e<a;e++,r+=2)d.fromBufferAttribute(t,e),u.fromBufferAttribute(i,e),n[r]=0===r?0:n[r-1],n[r+1]=n[r]+d.distanceTo(u);let r=new a.LuO(n,2,1);return e.setAttribute("instanceDistanceStart",new a.eHs(r,1,0)),e.setAttribute("instanceDistanceEnd",new a.eHs(r,1,1)),this}raycast(e,t){let i,s,o=this.material.worldUnits,l=e.camera;null!==l||o||console.error('LineSegments2: "Raycaster.camera" needs to be set in order to raycast against LineSegments2 while worldUnits is set to false.');let d=void 0!==e.params.Line2&&e.params.Line2.threshold||0;n=e.ray;let u=this.matrixWorld,y=this.geometry,b=this.material;if(r=b.linewidth+d,null===y.boundingSphere&&y.computeBoundingSphere(),w.copy(y.boundingSphere).applyMatrix4(u),o)i=.5*r;else{let e=Math.max(l.near,w.distanceToPoint(n.origin));i=S(l,e,b.resolution)}if(w.radius+=i,!1!==n.intersectsSphere(w)){if(null===y.boundingBox&&y.computeBoundingBox(),x.copy(y.boundingBox).applyMatrix4(u),o)s=.5*r;else{let e=Math.max(l.near,x.distanceToPoint(n.origin));s=S(l,e,b.resolution)}x.expandByScalar(s),!1!==n.intersectsBox(x)&&(o?function(e,t){let i=e.matrixWorld,s=e.geometry,o=s.attributes.instanceStart,l=s.attributes.instanceEnd,d=Math.min(s.instanceCount,o.count);for(let s=0;s<d;s++){v.start.fromBufferAttribute(o,s),v.end.fromBufferAttribute(l,s),v.applyMatrix4(i);let d=new a.Pq0,u=new a.Pq0;n.distanceSqToSegment(v.start,v.end,u,d),u.distanceTo(d)<.5*r&&t.push({point:u,pointOnLine:d,distance:n.origin.distanceTo(u),object:e,face:null,faceIndex:s,uv:null,uv1:null})}}(this,t):function(e,t,i){let s=t.projectionMatrix,o=e.material.resolution,l=e.matrixWorld,d=e.geometry,u=d.attributes.instanceStart,x=d.attributes.instanceEnd,w=Math.min(d.instanceCount,u.count),y=-t.near;n.at(1,p),p.w=1,p.applyMatrix4(t.matrixWorldInverse),p.applyMatrix4(s),p.multiplyScalar(1/p.w),p.x*=o.x/2,p.y*=o.y/2,p.z=0,h.copy(p),m.multiplyMatrices(t.matrixWorldInverse,l);for(let t=0;t<w;t++){if(c.fromBufferAttribute(u,t),f.fromBufferAttribute(x,t),c.w=1,f.w=1,c.applyMatrix4(m),f.applyMatrix4(m),c.z>y&&f.z>y)continue;if(c.z>y){let e=c.z-f.z,t=(c.z-y)/e;c.lerp(f,t)}else if(f.z>y){let e=f.z-c.z,t=(f.z-y)/e;f.lerp(c,t)}c.applyMatrix4(s),f.applyMatrix4(s),c.multiplyScalar(1/c.w),f.multiplyScalar(1/f.w),c.x*=o.x/2,c.y*=o.y/2,f.x*=o.x/2,f.y*=o.y/2,v.start.copy(c),v.start.z=0,v.end.copy(f),v.end.z=0;let d=v.closestPointToPointParameter(h,!0);v.at(d,g);let p=a.cj9.lerp(c.z,f.z,d),w=p>=-1&&p<=1,S=h.distanceTo(g)<.5*r;if(w&&S){v.start.fromBufferAttribute(u,t),v.end.fromBufferAttribute(x,t),v.start.applyMatrix4(l),v.end.applyMatrix4(l);let r=new a.Pq0,s=new a.Pq0;n.distanceSqToSegment(v.start,v.end,s,r),i.push({point:s,pointOnLine:r,distance:n.origin.distanceTo(s),object:e,face:null,faceIndex:t,uv:null,uv1:null})}}}(this,l,t))}}onBeforeRender(e){let t=this.material.uniforms;t&&t.resolution&&(e.getViewport(l),this.material.uniforms.resolution.value.set(l.z,l.w))}}},5330:(e,t,i)=>{i.d(t,{n:()=>s});var n=i(5339);let r=new n.NRn,a=new n.Pq0;class s extends n.CmU{constructor(){super(),this.isLineSegmentsGeometry=!0,this.type="LineSegmentsGeometry",this.setIndex([0,2,1,2,3,1,2,4,3,4,5,3,4,6,5,6,7,5]),this.setAttribute("position",new n.qtW([-1,2,0,1,2,0,-1,1,0,1,1,0,-1,0,0,1,0,0,-1,-1,0,1,-1,0],3)),this.setAttribute("uv",new n.qtW([-1,2,1,2,-1,1,1,1,-1,-1,1,-1,-1,-2,1,-2],2))}applyMatrix4(e){let t=this.attributes.instanceStart,i=this.attributes.instanceEnd;return void 0!==t&&(t.applyMatrix4(e),i.applyMatrix4(e),t.needsUpdate=!0),null!==this.boundingBox&&this.computeBoundingBox(),null!==this.boundingSphere&&this.computeBoundingSphere(),this}setPositions(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new n.LuO(t,6,1);return this.setAttribute("instanceStart",new n.eHs(i,3,0)),this.setAttribute("instanceEnd",new n.eHs(i,3,3)),this.instanceCount=this.attributes.instanceStart.count,this.computeBoundingBox(),this.computeBoundingSphere(),this}setColors(e){let t;e instanceof Float32Array?t=e:Array.isArray(e)&&(t=new Float32Array(e));let i=new n.LuO(t,6,1);return this.setAttribute("instanceColorStart",new n.eHs(i,3,0)),this.setAttribute("instanceColorEnd",new n.eHs(i,3,3)),this}fromWireframeGeometry(e){return this.setPositions(e.attributes.position.array),this}fromEdgesGeometry(e){return this.setPositions(e.attributes.position.array),this}fromMesh(e){return this.fromWireframeGeometry(new n.XJ7(e.geometry)),this}fromLineSegments(e){let t=e.geometry;return this.setPositions(t.attributes.position.array),this}computeBoundingBox(){null===this.boundingBox&&(this.boundingBox=new n.NRn);let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;void 0!==e&&void 0!==t&&(this.boundingBox.setFromBufferAttribute(e),r.setFromBufferAttribute(t),this.boundingBox.union(r))}computeBoundingSphere(){null===this.boundingSphere&&(this.boundingSphere=new n.iyt),null===this.boundingBox&&this.computeBoundingBox();let e=this.attributes.instanceStart,t=this.attributes.instanceEnd;if(void 0!==e&&void 0!==t){let i=this.boundingSphere.center;this.boundingBox.getCenter(i);let n=0;for(let r=0,s=e.count;r<s;r++)a.fromBufferAttribute(e,r),n=Math.max(n,i.distanceToSquared(a)),a.fromBufferAttribute(t,r),n=Math.max(n,i.distanceToSquared(a));this.boundingSphere.radius=Math.sqrt(n),isNaN(this.boundingSphere.radius)&&console.error("THREE.LineSegmentsGeometry.computeBoundingSphere(): Computed radius is NaN. The instanced position data is likely to have NaN values.",this)}}toJSON(){}}},5818:(e,t,i)=>{i.d(t,{_:()=>n});function n(e,t,i){if(!t.has(e))throw TypeError("attempted to get private field on non-instance");return i}},6319:(e,t,i)=>{i.d(t,{l:()=>r});var n=i(5339);class r extends n.Z58{constructor(){super(),this.name="RoomEnvironment",this.position.y=-3.5;let e=new n.iNn;e.deleteAttribute("uv");let t=new n._4j({side:n.hsX}),i=new n._4j,r=new n.HiM(0xffffff,900,28,2);r.position.set(.418,16.199,.3),this.add(r);let s=new n.eaF(e,t);s.position.set(-.757,13.219,.717),s.scale.set(31.713,28.305,28.591),this.add(s);let o=new n.ZLX(e,i,6),l=new n.B69;l.position.set(-10.906,2.009,1.846),l.rotation.set(0,-.195,0),l.scale.set(2.328,7.905,4.651),l.updateMatrix(),o.setMatrixAt(0,l.matrix),l.position.set(-5.607,-.754,-.758),l.rotation.set(0,.994,0),l.scale.set(1.97,1.534,3.955),l.updateMatrix(),o.setMatrixAt(1,l.matrix),l.position.set(6.167,.857,7.803),l.rotation.set(0,.561,0),l.scale.set(3.927,6.285,3.687),l.updateMatrix(),o.setMatrixAt(2,l.matrix),l.position.set(-2.017,.018,6.124),l.rotation.set(0,.333,0),l.scale.set(2.002,4.566,2.064),l.updateMatrix(),o.setMatrixAt(3,l.matrix),l.position.set(2.291,-.756,-2.621),l.rotation.set(0,-.286,0),l.scale.set(1.546,1.552,1.496),l.updateMatrix(),o.setMatrixAt(4,l.matrix),l.position.set(-2.193,-.369,-5.547),l.rotation.set(0,.516,0),l.scale.set(3.875,3.487,2.986),l.updateMatrix(),o.setMatrixAt(5,l.matrix),this.add(o);let d=new n.eaF(e,a(50));d.position.set(-16.116,14.37,8.208),d.scale.set(.1,2.428,2.739),this.add(d);let u=new n.eaF(e,a(50));u.position.set(-16.109,18.021,-8.207),u.scale.set(.1,2.425,2.751),this.add(u);let c=new n.eaF(e,a(17));c.position.set(14.904,12.198,-1.832),c.scale.set(.15,4.265,6.331),this.add(c);let f=new n.eaF(e,a(43));f.position.set(-.462,8.89,14.52),f.scale.set(4.38,5.441,.088),this.add(f);let p=new n.eaF(e,a(20));p.position.set(3.235,11.486,-12.541),p.scale.set(2.5,2,.1),this.add(p);let h=new n.eaF(e,a(100));h.position.set(0,20,0),h.scale.set(1,.1,1),this.add(h)}dispose(){let e=new Set;for(let t of(this.traverse(t=>{t.isMesh&&(e.add(t.geometry),e.add(t.material))}),e))t.dispose()}}function a(e){return new n.G_z({color:0,emissive:0xffffff,emissiveIntensity:e})}}}]);