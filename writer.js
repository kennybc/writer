class Writer {
	
	constructor(el, config = {
		
		imageQuality: 0.7
		
	}) {
		
		this.writer = this;
		this.blocks = [];
		this.selected = 0;
		this.dragging = 0;
		this.el = el;
		this.config = config;
		this.fullBlocks = ["image", "delimiter", "quote", "embed", "link"];
		this.inputs = {
			
			"heading": "M17.5 3.75v12.5h1.25a.625.625 0 0 1 .625.625v1.25a.625.625 0 0 1-.625.625H12.5a.625.625 0 0 1-.625-.625v-1.25a.625.625 0 0 1 .625-.625h1.25V11.25H6.25v5h1.25a.625.625 0 0 1 .625.625v1.25a.625.625 0 0 1-.625.625H1.25a.625.625 0 0 1-.625-.625v-1.25a.625.625 0 0 1 .625-.625h1.25V3.75H1.25a.625.625 0 0 1-.625-.625V1.875a.625.625 0 0 1 .625-.625h6.25a.625.625 0 0 1 .625.625v1.25a.625.625 0 0 1-.625.625h-1.25v5h7.5V3.75h-1.25a.625.625 0 0 1-.625-.625V1.875a.625.625 0 0 1 .625-.625h6.25a.625.625 0 0 1 .625.625v1.25a.625.625 0 0 1-.625.625z",
			"paragraph": "M17.5 1.875v1.25a.625.625 0 0 1-.625.625h-1.875v14.375a.625.625 0 0 1-.625.625h-1.25a.625.625 0 0 1-.625-.625V3.75h-1.25v14.375a.625.625 0 0 1-.625.625h-1.25a.625.625 0 0 1-.625-.625V13.75h-1.25a6.25 6.25 0 0 1 0-12.5h9.375a.625.625 0 0 1 .625.625z",
			"image": "M18.32 17.68H1.68c-1.06 0-1.92-.86-1.92-1.92V4.24c0-1.06.86-1.92 1.92-1.92h16.64c1.06 0 1.92.86 1.92 1.92v11.52c0 1.06-.86 1.92-1.92 1.92zM4.24 4.56c-1.237 0-2.24 1.003-2.24 2.24s1.003 2.24 2.24 2.24 2.24-1.003 2.24-2.24-1.003-2.24-2.24-2.24zM2.32 15.12h15.36V10.64l-3.501-3.501c-.187-.187-.491-.187-.679 0L8.08 12.56l-2.221-2.221c-.187-.187-.491-.187-.679 0L2.32 13.2v1.92z",
			"link": "M12.758 7.242c2.334 2.336 2.302 6.082.014 8.382-.004.005-.009.01-.014.014l-2.625 2.625c-2.315 2.315-6.082 2.315-8.397 0-2.315-2.315-2.315-6.082 0-8.397l1.449-1.449c.384-.384 1.046-.129 1.066.414 .025.692 .149 1.388.379 2.059.078 .227.022 .479-.148.649l-.511.511c-1.095 1.095-1.129 2.877-.045 3.983 1.095 1.116 2.894 1.123 3.997.02l2.625-2.625c1.101-1.101 1.097-2.881 0-3.978-.145-.144-.29-.256-.404-.335a.626.626 0 0 1-.271-.492c-.015-.413.131-.838.457-1.164l.822-.822c.216-.216.554-.242.804-.068a5.956 5.956 0 0 1 .802.672zM18.264 1.736c-2.315-2.315-6.082-2.315-8.397 0l-2.625 2.625c-.005.005-.01.01-.014.014-2.288 2.3-2.32 6.046.014 8.382a5.955 5.955 0 0 0 .802.672c.25.175 .588.148 .804-.068l.822-.822c.326-.326.472-.752.457-1.164a.626.626 0 0 0-.271-.492c-.114-.078-.259-.19-.404-.335-1.097-1.097-1.101-2.877 0-3.978l2.625-2.625c1.103-1.103 2.902-1.096 3.997.02 1.084 1.105 1.05 2.888-.045 3.983l-.511.511c-.17.17-.225.421-.148.649 .229.672 .353 1.367.379 2.059.02 .543.682 .799 1.066.414l1.449-1.449c2.315-2.315 2.315-6.082 0-8.397z",
			"quote": "M16.5 3H12.5c-.828 0-1.5.672-1.5 1.5v4c0 .828.672 1.5 1.5 1.5h2.5v2c0 1.103-.897 2-2 2h-.25c-.416 0-.75.334-.75.75v1.5c0 .416.334 .75.75 .75h.25c2.763 0 5-2.237 5-5V4.5c0-.828-.672-1.5-1.5-1.5zm-9 0H3.5C2.672 3 2 3.672 2 4.5v4c0 .828.672 1.5 1.5 1.5h2.5v2c0 1.103-.897 2-2 2h-.25c-.416 0-.75.334-.75.75v1.5c0 .416.334 .75.75 .75h.25c2.763 0 5-2.237 5-5V4.5c0-.828-.672-1.5-1.5-1.5z",
			"embed": "M8.536 19.102l-2.173-.631c-.228-.064-.356-.303-.292-.531L10.933 1.19c.064-.228.303-.356.531-.292l2.173.631c.228.064 .356.303 .292.531L9.067 18.81c-.068.228-.303.36-.531.292zm-4.061-3.997 1.55-1.653c.164-.175.153-.452-.029-.613L2.768 10l3.228-2.839c.182-.16.196-.438.028-.613l-1.55-1.653c-.16-.171-.431-.182-.606-.018L-1.265 9.687c-.182.167-.182.456 0 .623l5.134 4.813c.175.164 .445.157 .606-.018zm11.656.021 5.134-4.813c.182-.167.182-.456 0-.623L16.131 4.874c-.171-.16-.442-.153-.606.018L13.976 6.544c-.164.175-.153.452 .029.613L17.232 10l-3.228 2.839c-.182.16-.196.438-.029.613l1.55 1.653c.16.175 .431.182 .606.021z",
			"delimiter": "m2.891 7.188c-1.555 0-2.812 1.258-2.812 2.813 0 1.555 1.258 2.813 2.813 2.813 1.555 0 2.813-1.258 2.813-2.812 0-1.555-1.258-2.812-2.812-2.812zm14.219 0c-1.555 0-2.812 1.258-2.812 2.813 0 1.555 1.258 2.813 2.813 2.813 1.555 0 2.813-1.258 2.813-2.812 0-1.555-1.258-2.812-2.812-2.812zm-4.297 2.813c0 1.555-1.258 2.813-2.812 2.813-1.555 0-2.812-1.258-2.812-2.812 0-1.555 1.258-2.812 2.813-2.812 1.555 0 2.813 1.258 2.813 2.813z",
			
		};
		this.settings = {
			
			"delete": "M2.5 18.125a1.875 1.875 0 0 0 1.875 1.875h11.25a1.875 1.875 0 0 0 1.875-1.875V5H2.5zm10.625-10a.625.625 0 0 1 1.25 0v8.75a.625.625 0 0 1-1.25 0zm-3.75 0a.625.625 0 0 1 1.25 0v8.75a.625.625 0 0 1-1.25 0zm-3.75 0a.625.625 0 0 1 1.25 0v8.75a.625.625 0 0 1-1.25 0zM18.125 1.25H13.438l-.367-.73A.938.938 0 0 0 12.23 0H7.766a.927.927 0 0 0-.836.52L6.563 1.25H1.875A.625.625 0 0 0 1.25 1.875v1.25a.625.625 0 0 0 .625.625h16.25a.625.625 0 0 0 .625-.625V1.875a.625.625 0 0 0-.625-.625z",
			"up": "M2.615 11.172l-.867-.867c-.367-.367-.367-.961 0-1.324L9.338 1.387c.367-.367.961-.367 1.324 0l7.59 7.59c.367.367 .367.961 0 1.324L17.385 11.168c-.371.371-.977.363-1.34-.016L11.564 6.449V17.676c0 .52-.418.938-.937.938h-1.25c-.52 0-.937-.418-.937-.937V6.449L3.955 11.156c-.363.383-.969.391-1.34.016z",
			"down": "M17.387 8.828l.867.867c.367.367 .367.961 0 1.324L10.664 18.613c-.367.367-.961.367-1.324 0L1.746 11.02c-.367-.367-.367-.961 0-1.324l.867-.867c.371-.371.977-.363 1.34.016L8.438 13.551V2.324c0-.52.418-.937.938-.937h1.25c.52 0 .938.418 .938.938v11.227l4.484-4.707c.363-.383.969-.391 1.34-.016z"
			
		};
		this.options = {
			
			"align-0": "M1.751 13.75h10.248A.501.501 0 0 0 12.5 13.249v-1.498A.501.501 0 0 0 11.999 11.25H1.751A.501.501 0 0 0 1.25 11.751v1.498A.501.501 0 0 0 1.751 13.75zm0-10h10.248A.501.501 0 0 0 12.5 3.249V1.751A.501.501 0 0 0 11.999 1.25H1.751A.501.501 0 0 0 1.25 1.751v1.498A.501.501 0 0 0 1.751 3.75zM18.125 6.25H1.875a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h16.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm0 10H1.875a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h16.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625z",
			"align-1": "M18.125 6.25H1.875a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h16.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm0 10H1.875a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h16.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zM5.473 3.75h9.055A.472.472 0 0 0 15 3.277V1.722A.472.472 0 0 0 14.528 1.25H5.473A.472.472 0 0 0 5 1.722V3.277A.473.473 0 0 0 5.473 3.75zm9.055 10A.472.472 0 0 0 15 13.277v-1.555A.472.472 0 0 0 14.528 11.25H5.473A.472.472 0 0 0 5 11.722v1.555a.473.473 0 0 0 .473.473z",
			"align-2": "M1.875 8.75h16.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625H1.875a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625zm16.25 7.5H1.875a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h16.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm.124-15H8.001A.501.501 0 0 0 7.5 1.751v1.498A.501.501 0 0 0 8.001 3.75h10.248A.501.501 0 0 0 18.75 3.249V1.751A.501.501 0 0 0 18.249 1.25zm0 10H8.001A.501.501 0 0 0 7.5 11.751v1.498A.501.501 0 0 0 8.001 13.75h10.248A.501.501 0 0 0 18.75 13.249v-1.498A.501.501 0 0 0 18.249 11.25z",
			"border-0": "M17.5 1.25H2.5A1.25 1.25 0 0 0 1.25 2.5v15a1.25 1.25 0 0 0 1.25 1.25h15a1.25 1.25 0 0 0 1.25-1.25V2.5a1.25 1.25 0 0 0-1.25-1.25zm-1.25 2.5v5H11.25V3.75zm-7.5 0v5H3.75V3.75zM3.75 16.25V11.25h5v5zm7.5 0V11.25h5v5z",
			"border-1": "M10.625 8.75h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm3.75 0h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm3.75 0h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm-11.25 0h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm3.75 7.5h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm3.75 0h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm3.75 0h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm0-3.75h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm0-7.5h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zM10.625 12.5h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm0-7.5h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm-3.75 11.25h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm3.75-15h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625V1.875a.625.625 0 0 0-.625-.625zm3.75 0h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625V1.875a.625.625 0 0 0-.625-.625zm3.75 0h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625V1.875a.625.625 0 0 0-.625-.625zM3.125 8.75H1.875a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm0 7.5H1.875a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm0-3.75H1.875a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm0-7.5H1.875a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625v-1.25a.625.625 0 0 0-.625-.625zm0-3.75H1.875A.625.625 0 0 0 1.25 1.875v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625V1.875a.625.625 0 0 0-.625-.625zm3.75 0h-1.25a.625.625 0 0 0-.625.625v1.25a.625.625 0 0 0 .625.625h1.25a.625.625 0 0 0 .625-.625V1.875a.625.625 0 0 0-.625-.625z"
			
		};
		this.embeds = {
			
			"youtube": "M30.331 7.27c-.368-1.386-1.452-2.477-2.829-2.847C25.007 3.75 15 3.75 15 3.75S4.993 3.75 2.498 4.423c-1.377.37-2.461 1.462-2.829 2.847-.669 2.512-.669 7.752-.669 7.752s0 5.241.669 7.752c.368 1.386 1.452 2.432 2.829 2.802C4.993 26.25 15 26.25 15 26.25s10.007 0 12.502-.673c1.377-.37 2.461-1.416 2.829-2.802.669-2.512.669-7.752.669-7.752s0-5.241-.669-7.752zm-18.604 12.51V10.265l8.364 4.758-8.364 4.758z",
			"instagram": "M15.003 8.268c-3.727 0-6.732 3.006-6.732 6.732s3.006 6.732 6.732 6.732S21.735 18.727 21.735 15 18.729 8.268 15.003 8.268zm0 11.109c-2.408 0-4.377-1.963-4.377-4.377s1.963-4.377 4.377-4.377 4.377 1.963 4.377 4.377-1.969 4.377-4.377 4.377zm8.578-11.385c0 .873-.703 1.57-1.57 1.57-.873 0-1.57-.703-1.57-1.57s.703-1.57 1.57-1.57 1.57.703 1.57 1.57zm4.459 1.594c-.1-2.104-.58-3.967-2.121-5.502-1.535-1.535-3.398-2.016-5.502-2.121-2.168-.123-8.666-.123-10.834 0-2.098.1-3.961.58-5.502 2.115s-2.016 3.398-2.121 5.502c-.123 2.168-.123 8.666 0 10.834.1 2.104.58 3.967 2.121 5.502s3.398 2.016 5.502 2.121c2.168.123 8.666.123 10.834 0 2.104-.1 3.967-.58 5.502-2.121 1.535-1.535 2.016-3.398 2.121-5.502.123-2.168.123-8.66 0-10.828zM25.239 22.74c-.457 1.148-1.342 2.033-2.496 2.496-1.729.686-5.83.527-7.74.527s-6.018.152-7.74-.527c-1.148-.457-2.033-1.342-2.496-2.496-.686-1.729-.527-5.83-.527-7.74s-.152-6.018.527-7.74c.457-1.148 1.342-2.033 2.496-2.496 1.729-.686 5.83-.527 7.74-.527s6.018-.152 7.74.527c1.148.457 2.033 1.342 2.496 2.496.686 1.729.527 5.83.527 7.74s.158 6.018-.527 7.74z",
			"twitter": "M26.916 8.89c.019.266 .019.533 .019.8 0 8.128-6.187 17.494-17.494 17.494-3.484 0-6.72-1.009-9.442-2.76.495 .057.971 .076 1.485.076 2.874 0 5.52-.971 7.633-2.627-2.703-.057-4.968-1.827-5.749-4.264.381 .057.761 .095 1.161.095 .552 0 1.104-.076 1.618-.209-2.817-.571-4.93-3.046-4.93-6.034v-.076c.818.457 1.77.742 2.779.78-1.656-1.104-2.741-2.989-2.741-5.121 0-1.142.305-2.189.838-3.103 3.027 3.731 7.576 6.167 12.678 6.434-.095-.457-.152-.933-.152-1.409 0-3.388 2.741-6.148 6.148-6.148 1.77 0 3.369.742 4.492 1.942 1.39-.266 2.722-.78 3.902-1.485-.457 1.428-1.428 2.627-2.703 3.388 1.237-.133 2.437-.476 3.541-.952-.837 1.218-1.884 2.303-3.084 3.179z",
			"facebook": "M29.531 15.088C29.531 7.061 23.027.557 15 .557S.469 7.061.469 15.088c0 7.253 5.314 13.264 12.261 14.355V19.288h-3.691V15.088h3.691v-3.202c0-3.642 2.168-5.653 5.488-5.653 1.59 0 3.253.284 3.253.284v3.574h-1.833c-1.805 0-2.368 1.12-2.368 2.269V15.088h4.03l-.645 4.201h-3.386V29.443C24.217 28.352 29.531 22.341 29.531 15.088z"
			
		};
		
	}
	init() {
		
		this.appendMenu();
		document.getElementById(this.el).addEventListener("click", function(e) {
			
			this.writer.selected = 0;
			this.writer.deselectAllBlocks();
			
		}.bind(this));
		document.getElementById(this.el).addEventListener("keydown", function(e) {
			
			var index = this.writer.getFocusedBlock();
			if((e.keyCode == 38 || e.keyCode == 40) && index !== false && window.getSelection().baseNode !== null && document.getElementsByClassName("w-block--selected").length == 0) {
				
				var indices = this.writer.blocks[index].getSelectedIndices();
				if(indices.collapsed === true) {
					
					if(indices.pos == 0 && e.keyCode == 38) {
						
						if(this.writer.blocks[index].node.children.length == 0 || this.getNodeIndex(indices.node) == 0) {
							
							e.preventDefault();
							if(index > 0) {
								
								if(this.writer.blocks[index - 1].node.textContent == "" && this.writer.blocks[index - 1].node.childNodes.length > 0) {
									
									this.writer.blocks[index - 1].focus();
									
								} else this.writer.blocks[index - 1].focus();
								
							}
							
						}
						
					} else if(e.keyCode == 40) {
						
						var contentNodes = this.getContentNodes(this.writer.blocks[index].node);
						var lastNode = this.writer.blocks[index].getLastNode();
						if(!lastNode) lastNode = this.writer.blocks[index].node;
						if(this.writer.blocks[index].node.childNodes.length == 0 && indices.pos == this.writer.blocks[index].node.textContent.length) {
							
							e.preventDefault();
							if(index < this.writer.blocks.length - 1) this.writer.blocks[index + 1].focus(0);
							
						} else if(this.writer.blocks[index].node.childNodes.length != 0) {
							
							if((indices.node == this.writer.blocks[index].node.lastChild && indices.pos == this.writer.blocks[index].node.lastChild.textContent.length) || (window.getSelection().getRangeAt(0).startOffset == this.writer.blocks[index].node.childNodes.length - 1)) {
								
								e.preventDefault();
								if(index < this.writer.blocks.length - 1) this.writer.blocks[index + 1].focus(0);
								
							}
							
						}
						
					}
					
				}
				
			}
			if(e.keyCode == 13 && !e.shiftKey) {
				
				e.preventDefault();
				if(document.getElementsByClassName("w-block--selected").length !== 0) {
					
					this.writer.deleteSelectedBlocks();
					
				} else {
					
					var indices = this.writer.blocks[index].getSelectedIndices();
					if(indices.collapsed == true && indices.pos == 0 && this.writer.blocks[index].node.textContent.length > 0 && index == 0 && indices.node == this.writer.blocks[index].node.childNodes[0]) {
						
						var block = new Block(this.writer, "paragraph", index - 1, false);
						this.writer.blocks.splice(index, 0, block);
						
						
					} else {
						
						var node = this.writer.blocks[index].node;
						if(indices.collapsed == true && node.textContent.length > 0) {
							
							var range = document.createRange();
							var sel = window.getSelection();
							range.setStart(indices.node, indices.pos);
							var lastNode = this.writer.blocks[index].getLastNode();
							if(!lastNode) lastNode = this.writer.blocks[index].node.childNodes[this.writer.blocks[index].node.childNodes.length - 1];
							range.setEnd(lastNode, lastNode.textContent.length);
							sel.removeAllRanges();
							sel.addRange(range);
							
							
						}
						var selectedContent = this.writer.blocks[index].cutSelection();
						var block = new Block(this.writer, "paragraph", index, false);
						block.setRawContent(selectedContent);
						this.writer.blocks.splice(index + 1, 0, block);
						
					}
					
				}
				
			}
			if(e.keyCode == 65 && e.ctrlKey) {
				
				this.writer.selected ++;
				if(this.writer.selected == 1) {
					
					this.writer.deselectAllBlocks();
					
				} else if(this.writer.selected >= 2) {
					
					e.preventDefault();
					var sel = window.getSelection();
					sel.removeAllRanges();
					for(var i = 0; i < this.writer.blocks.length; i ++) {
						
						this.writer.blocks[i].selectBlock();
						
					}
					
				}
				
			}
			if(e.keyCode == 8 && document.getElementsByClassName("w-block--selected").length == 0 && index !== false) {
				
				if(index > 0) var type = this.writer.blocks[index - 1].type;
				if(index == 0) var type = null;
				if(type == "delimiter" || type == "image" || type == "embed") return;
				if(this.writer.blocks[index].node.textContent === "" && this.writer.blocks.length > 1 && index > 0) {
					
					if(this.writer.blocks[index - 1].type == this.writer.blocks[index].type || this.writer.blocks[index].node.innerHTML == "") {
						
						e.preventDefault();
						var newFocus = index - 1;
						this.writer.blocks[index].remove();
						this.writer.blocks.splice(index, 1);
						if(index == 0) newFocus = 0;
						this.writer.blocks[newFocus].focus();
						
					} else {
						
						this.writer.blocks[index - 1].focus();
						
					}
					
				} else if(this.writer.blocks[index].node.textContent === "" && this.writer.blocks.length == 0) {
					
					if(this.writer.blocks[0].type != "paragraph") {
						
						this.writer.blocks[0].remove();
						this.writer.blocks[0] = new Block(writer);
						
					}
					
				} else if(this.writer.blocks[index].node.textContent !== "" && index != 0 && this.writer.blocks[index].getSelectedIndices().collapsed == true && this.writer.blocks[index].getSelectedIndices().pos == 0) {
					
					e.preventDefault();
					if(this.writer.blocks[index - 1].type == this.writer.blocks[index].type) {
						
						var content = this.writer.blocks[index].node.textContent;
						var rawContent = this.writer.blocks[index].node.innerHTML;
						var prevNode = this.writer.blocks[index - 1];
						var lastChild = prevNode.node.childNodes[prevNode.node.childNodes.length - 1];
						if(lastChild && lastChild.nodeName.toLowerCase() == "br") prevNode.node.removeChild(lastChild);
						prevNode.setRawContent(prevNode.getRawContent() + rawContent);
						prevNode.focus(prevNode.getContent().length - content.length);
						this.writer.blocks[index].remove();
						this.writer.blocks.splice(index, 1);
						
					} else {
						
						this.writer.blocks[index - 1].focus();
						
					}
					
				}
				
			} else if(e.keyCode == 8) {
				
				e.preventDefault();
				this.writer.deleteSelectedBlocks();
				
			}
			
		}.bind(this));
		document.getElementById(this.el).addEventListener("input", function() {
			
			if(this.writer.getFocusedBlock() === false) return false;
			if(this.writer.blocks[this.writer.getFocusedBlock()].node.textContent.trim() !== "") {
				
				this.writer.hideMenuToggle();
				this.writer.hideMenu();
				
			} else {
				
				var block = this.writer.getFocusedBlock();
				if(!this.fullBlocks.includes(this.writer.blocks[block].type)) this.writer.showMenuToggle(this.writer.blocks[block].el);
				
			}
			
		}.bind(this));
		document.getElementById(this.el).addEventListener("paste", function(e) {
			
			e.preventDefault();
			var text = (e.originalEvent || e).clipboardData.getData("text/plain");
			document.execCommand("insertHTML", false, text);
			
		});
		this.blocks.push(new Block(this));
		
	}
	getFocusedBlock() {
		
		var focused = document.getElementsByClassName("w-block--focused");
		if(focused.length == 0) return false;
		return Array.prototype.indexOf.call(document.getElementById(this.el).children, focused[0]) - 1;
		
	}
	getNodeIndex(node) {
		
		var numLines = 0;
		var clonedNodes = this.getContentNodes(node.parentNode);
		if(clonedNodes.length == 0) return 0;
		for(var i = 0; i < clonedNodes.length; i ++) {
			
			if(Array.prototype.indexOf.call(clonedNodes[i], node) !== -1) return i;
			
		}
		
	}
	getContentNodes(node) {
		
		var clonedNodes = [];
		var tempNode = [];
		for(var i = 0; i < node.childNodes.length; i ++) {
			
			if(node.childNodes[i].nodeName === "BR") {
				
				clonedNodes.push(tempNode);
				tempNode = [];
				
			} else {
				
				tempNode.push(node.childNodes[i]);
				
			}
			
		}
		clonedNodes.push(tempNode);
		return clonedNodes;
		
	}
	getNumRows(node) {
		
		return node.innerHTML.split("<br>").length;
		
	}
	deselectAllBlocks() {
		
		for(var i = 0; i < this.writer.blocks.length; i ++) {
			
			this.writer.blocks[i].deselectBlock();
			
		}
		
	}
	deleteSelectedBlocks() {
		
		for(var i = 0; i < this.writer.blocks.length; i ++) {
			
			if(this.writer.blocks[i].selected == true) {
				
				this.writer.blocks[i].remove();
				this.writer.blocks.splice(i, 1);
				i --;
				
			}
			
		}
		if(this.writer.blocks.length == 0) {
			
			var block = new Block(this.writer);
			this.writer.blocks.push(block);
			
		}
		
	}
	appendMenu() {
		
		var menu = document.getElementById(this.el).appendChild(document.createElement("div"));
		menu.id = "w-menu";
		menu.style.opacity = "0";
		for(var key of Object.keys(this.inputs)) { (function() {
			
			var input = menu.appendChild(document.createElement("div"));
			input.className = "w-menu__item";
			input.id = "w-menu__item--" + key;
			input.setAttribute("focusable", "false");
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
			path.setAttribute("d", this.inputs[key]);
			input.style.transform = "translateX(-" + (30 * (Object.keys(this.inputs).indexOf(key) + 1)) + "px)";
			input.style.zIndex = "-1";
			input.appendChild(svg);
			svg.appendChild(path);
			input.addEventListener("mousedown", function(e) {
				
				e.preventDefault();
				
			});
			input.addEventListener("click", function(e) {
				
				var type = input.id.slice(14);
				var focused = this.writer.getFocusedBlock();
				if(this.writer.getFocusedBlock() !== false) {
					
					this.writer.blocks[focused].remove();
					switch(type) {
						
						case "delimiter":
							this.writer.blocks.splice(focused, 1, new DelimiterBlock(this.writer, type, focused, true));
							break;
						case "image":
							this.writer.blocks.splice(focused, 1, new ImageBlock(this.writer, type, focused, true));
							break;
						case "quote":
							this.writer.blocks.splice(focused, 1, new QuoteBlock(this.writer, type, focused, true));
							break;
						case "embed":
							this.writer.blocks.splice(focused, 1, new EmbedBlock(this.writer, type, focused, true));
							break;
						case "link":
							this.writer.blocks.splice(focused, 1, new LinkBlock(this.writer, type, focused, true));
							break;
						default:
							this.writer.blocks.splice(focused, 1, new Block(this.writer, type, focused, true));
							break;
						
					}
					if(this.fullBlocks.includes(type) && focused == this.writer.blocks.length - 1) this.writer.blocks.push(new Block(this.writer));
					
				}
				this.writer.hideMenu();
				
			}.bind(this));
			var tooltip = input.appendChild(document.createElement("div"));
			tooltip.className = "w-tooltip";
			tooltip.textContent = key.charAt(0).toUpperCase() + key.slice(1);
			
		}.bind(this)()); }
		
	}
	showMenu(offset) {
		
		var menu = document.getElementById("w-menu");
		menu.style.opacity = "1";
		menu.style.top = offset + "px";
		menu.style.overflow = "visible";
		this.blocks[this.getFocusedBlock()].hideCursor();
		for(var key of Object.keys(this.inputs)) {
			
			var input = document.getElementById("w-menu__item--" + key);
			input.style.animation = "w-fan 0.3s forwards";
			input.style.zIndex = "1";
			
		}
		
	}
	hideMenu() {
		
		var menu = document.getElementById("w-menu");
		menu.style.opacity = "0";
		menu.style.overflow = "hidden";
		for(var i = 0; i < this.blocks.length; i ++) {
			
			this.blocks[i].showCursor();
			
		}
		window.setTimeout(function() {
			
			for(var key of Object.keys(this.inputs)) {
				
				var input = document.getElementById("w-menu__item--" + key);
				input.style.animation = "";
				input.style.zIndex = "-1";
				
			}
			
		}.bind(this), 200);
		
	}
	showMenuToggle(parentNode) {
		
		var menuToggle = document.getElementById("w-menu__toggle");
		if(menuToggle) menuToggle.remove();
		menuToggle = document.createElement("div");
		menuToggle.id = "w-menu__toggle";
		parentNode.appendChild(menuToggle);
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "M14.512 10.797l-6.375 6.375c-.441.441-1.153.441-1.589 0l-1.059-1.059c-.441-.441-.441-1.153 0-1.589l4.519-4.519-4.519-4.519c-.441-.441-.441-1.153 0-1.589L6.543 2.828c.441-.441 1.153-.441 1.589 0l6.375 6.375c.445.441 .445 1.153.005 1.594z");
		menuToggle.appendChild(svg);
		svg.appendChild(path);
		menuToggle.addEventListener("mousedown", function(e) {
			
			e.preventDefault();
			
		});
		menuToggle.addEventListener("click", function() {
			
			if(document.getElementById("w-menu").style.opacity == "0") {
				
				this.writer.showMenu(menuToggle.parentNode.offsetTop + menuToggle.offsetTop);
				
			} else {
				
				this.writer.hideMenu();
				
			}
			
		}.bind(this));
		
	}
	hideMenuToggle() {
		
		var menuToggle = document.getElementById("w-menu__toggle");
		if(menuToggle) {
			
			this.writer.hideMenu();
			menuToggle.style.opacity = "0";
			menuToggle.style.transform = "scale(0.3)";
			window.setTimeout(function() {
				
				menuToggle.remove();
				
			}, 200);
			
		}
		
	}
	getConfig() {
		
		return(this.config);
		
	}
	getBlocks() {
		
		var blockArray = [];
		for(var i = 0; i < this.blocks.length; i ++) {
			
			var blockObject = {};
			var blockData = {};
			blockData["content"] = this.blocks[i].getRawContent();
			blockObject["type"] = this.blocks[i].type;
			blockObject["data"] = blockData;
			blockArray.push(blockObject);
			
		}
		console.log(blockArray);
		
	}
	exportBlocks() {
		
		var allBlocks = {
			
			"blocks": []
			
		};
		for(var i = 0; i < this.blocks.length; i ++) {
			
			var ok = true;
			var blockObj = {};
			blockObj.type = this.blocks[i].type;
			switch(blockObj.type) {
				
				case "paragraph":
				case "heading":
				case "quote":
					blockObj.content = this.blocks[i].getRawContent();
					break;
				case "embed":
					var height = this.blocks[i].nodeContent.style.height;
					if(height == "") height = "100%";
					blockObj.height = height;
				case "image":
					var width = this.blocks[i].nodeContent.style.width;
					if(width == "") width = "100%";
					blockObj.width = width;
					blockObj.src = this.blocks[i].src;
					if(this.blocks[i].src == "") ok = false;
					break;
				case "link":
					blockObj.href = this.blocks[i].getContent();
				
			}
			this.blocks[i].options.forEach(function(setting) {
				
				blockObj[setting] = this.blocks[i].el.getAttribute("data-" + setting);
				
			}.bind(this));
			allBlocks.blocks.push(blockObj);
			
		}
		var i = allBlocks.blocks.length;
		while(i --) {
			
			if("content" in allBlocks.blocks[i] && allBlocks.blocks[i].content == "") {
				
				allBlocks.blocks.pop();
				
			} else break;
			
		}
		while("content" in allBlocks.blocks[0] && allBlocks.blocks[0].content == "") {
			
			allBlocks.blocks.shift();
			
		}
		document.getElementById("output").innerHTML = JSON.stringify(allBlocks);;
		
	}
	parse(blockJSON) {
		
		for(var i = 0; i < this.blocks.length; i ++) this.blocks[i].remove();
		this.blocks = [];
		var obj = JSON.parse(document.getElementById("output").innerHTML);
		for(var i = 0; i < obj.blocks.length; i ++) {
			
			var block = obj.blocks[i];
			console.log(block);
			switch(block.type) {
				
				case "paragraph":
					this.blocks.push(new Block(this, "paragraph", false));
					this.blocks[i].setRawContent(block.content);
					break;
				case "heading":
					this.blocks.push(new Block(this, "heading", false));
					this.blocks[i].setRawContent(block.content);
					break;
				case "delimiter":
					this.blocks.push(new DelimiterBlock(this, "delimiter", false));
					break;
				case "image":
					this.blocks.push(new ImageBlock(this, "image", false));
					this.blocks[i].parseFile(block.src);
					this.blocks[i].nodeContent.style.width = block.width;
					break;
				case "embed":
					this.blocks.push(new EmbedBlock(this, "embed", false));
					this.blocks[i].embed(block.src, true);
					this.blocks[i].nodeContent.style.width = block.width;
					this.blocks[i].nodeContent.style.height = block.height;
					break;
				case "quote":
					this.blocks.push(new QuoteBlock(this, "quote", false));
					this.blocks[i].setRawContent(block.content);
					break;
				case "link":
					this.blocks.push(new LinkBlock(this, "link", false));
					this.blocks[i].setRawContent(block.href);
					break;
				
			}
			
		}
		this.blocks[0].focus();
		
	}
	
}
class Block {
	
	constructor(writer, type = "paragraph", focused = writer.getFocusedBlock(), replace = false) {
		
		this.type = type;
		this.selected = false;
		if(!(writer instanceof Writer)) throw new Error("Invalid Writer object");
		this.writer = writer;
		var offset = 0;
		if(replace === true) offset = -1;
		if(focused === false || focused === document.getElementsByClassName("w-block").length - 1 - offset) {
			
			this.el = document.getElementById(writer.el).appendChild(document.createElement("div"));
			
		} else {
			
			this.el = document.getElementById(writer.el).insertBefore(document.createElement("div"), document.getElementById(writer.el).childNodes[focused + 3 + offset]);
			
		}
		this.el.classList.add("w-block");
		this.add(this.type);
		
	}
	add(type) {
		
		this.options = ["align"];
		this.el.classList.add("w-block--focused");
		this.node = this.el.appendChild(document.createElement("div"));
		this.node.className = "w-block__" + type;
		this.node.contentEditable = true;
		this.node.addEventListener("focus", function() {
			
			this.el.classList.add("w-block--focused");
			if(this.node.textContent === "") {
				
				this.writer.showMenuToggle(this.el);
				
			}
			this.showSettingsToggle();
			
		}.bind(this));
		this.node.addEventListener("click", function() {
			
			var menuToggle = document.getElementById("w-menu__toggle");
			if(!menuToggle && this.node.innerHTML === "") this.writer.showMenuToggle(this.el);
			var settingsToggle = document.getElementById("w-settings__toggle");
			if(!settingsToggle) this.showSettingsToggle();
			
		}.bind(this));
		this.node.addEventListener("blur", function() {
			
			this.el.classList.remove("w-block--focused");
			this.writer.hideMenuToggle();
			this.hideSettingsToggle();
			
		}.bind(this));
		this.node.focus();
		this.options.forEach(function(setting) {
			
			this.el.setAttribute("data-" + setting, "0");
			
		}.bind(this));
		
	}
	remove() {
		
		this.el.remove();
		
	}
	getLastNode(node = this.node) {
		
		var content = this.writer.getContentNodes(node);
		if(!node.innerHTML || node.innerHTML.length == 0) return false;
		var lastRow = content[content.length - 1];
		var lastNode = lastRow[lastRow.length - 1];
		for(var i = 0; lastRow.length == 0; i ++) {
			
			if(i == content.length) return false;
			lastRow = content[content.length - (1 + i)];
			
		}
		if(!lastRow.innerHTML || lastRow.innerHTML.length == 0) return false;
		for(var i = 0; lastNode.childNodes.length > 0; i ++) {
			
			lastNode = lastNode.childNodes[i];
			
		}
		return lastNode;
		
	}
	focus(cursor = false) {
		
		var lastNode = this.getLastNode();
		if(this.node.textContent.length > 0 || this.node.childNodes > 0) {
			
			var range = document.createRange();
			var sel = window.getSelection();
			if(cursor === false && !lastNode) {
				
				if(!lastNode) lastNode = this.node.lastChild;
				range.setStart(lastNode, lastNode.textContent.length);
				
			} else {
				
				var tick = 0;
				var cursorIndex;
				var cursorNode;
				for(var i = 0; i < this.node.childNodes.length; i ++) {
					
					if(this.node.childNodes[i].textContent) {
						
						cursorIndex = 0;
						for(var j = 0; j < this.node.childNodes[i].textContent.length; j ++) {
							
							if(tick < cursor) {
								
								tick ++;
								cursorIndex ++;
								
							} else {
								
								break;
								
							}
							
						}
						
					}
					if(tick == cursor) {
						
						cursorNode = this.node.childNodes[i];
						break;
						
					}
					
				}
				if(!this.getLastNode(cursorNode)) {
					
					if(cursorNode.lastChild !== null) cursorNode = cursorNode.lastChild;
					range.setStart(cursorNode, cursorIndex);
					
				} else {
					
					range.setStart(this.getLastNode(cursorNode), cursorIndex);
					
				}
				
			}
			range.collapse(true);
			sel.removeAllRanges();
			sel.addRange(range);
			
		}
		this.node.focus();
		
	}
	select() {
		
		if(this.node.textContent.length == 0) return false;
		var range = document.createRange();
		var sel = window.getSelection();
		range.setStart(this.node.firstChild, 0);
		if(this.writer.getNumRows(this.node).length == 1) {
			
			range.setEnd(this.node.lastChild, this.node.lastChild.textContent.length);
			
		} else {
			
			var lastNode = this.getLastNode();
			range.setEnd(lastNode, lastNode.textContent.length);
			
		}
		sel.removeAllRanges();
		sel.addRange(range);
		
	}
	selectBlock() {
		
		this.selected = true;
		this.el.classList.add("w-block--selected");
		this.writer.hideMenuToggle();
		this.hideSettingsToggle();
		
	}
	deselectBlock() {
		
		this.selected = false;
		this.el.classList.remove("w-block--selected");
		
	}
	showCursor() {
		
		if(this.el.style.color == "transparent") this.el.removeAttribute("style");
		
	}
	hideCursor() {
		
		this.el.style.color = "transparent";
		
	}
	setContent(content) {
		
		this.node.textContent = content;
		if(content !== "") {
			
			this.writer.hideMenuToggle();
			
		}
		
	}
	setRawContent(content) {
		
		this.node.innerHTML = content;
		if(content !== "") {
			
			this.writer.hideMenuToggle();
			
		}
		
	}
	getContent() {
		
		return this.node.textContent;
		
	}
	getRawContent() {
		
		return this.node.innerHTML;
		
	}
	getSelectedIndices() {
		
		var start, end;
		var sel = window.getSelection();
		if(sel.getRangeAt && sel.rangeCount) {
			
			var range = sel.getRangeAt(0);
			var preRange = range.cloneRange();
			var start = range.startOffset;
			var end = range.endOffset;
			if(range.collapsed === true) return {
				
				collapsed: true,
				node: range.startContainer,
				pos: range.startOffset
				
			};
			return {
				
				collapsed: false,
				startNode: range.startContainer,
				endNode: range.endContainer,
				start: range.startOffset,
				end: range.endOffset
				
			};
			
		}
		
	}
	getSelection() {
		
		var sel = window.getSelection();
		var selection = "";
		if(sel.rangeCount > 0) {
			
			var range = sel.getRangeAt(0);
			var temp = document.createElement("div");
			temp.appendChild(range.cloneContents());
			selection = temp.innerHTML;
			
		}
		return selection;
		
	}
	cutSelection() {
		
		var selection = this.getSelection();
		if(this.getSelectedIndices().collapsed === false) document.execCommand("delete");
		return selection;
		
	}
	getBlockIndex() {
		
		return Array.prototype.indexOf.call(this.writer.blocks, this);
		
	}
	showSettingsToggle() {
		
		if(document.getElementById("w-settings")) document.getElementById("w-settings").remove();
		var parentNode = this.el;
		this.menuToggle = document.getElementById("w-settings__toggle");
		if(this.menuToggle) this.menuToggle.remove();
		this.menuToggle = document.createElement("div");
		this.menuToggle.id = "w-settings__toggle";
		parentNode.appendChild(this.menuToggle);
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "M19.039 12.332l-1.664-.961c.168-.906.168-1.836 0-2.742l1.664-.961c.191-.109.277-.336.215-.547-.434-1.391-1.172-2.648-2.137-3.695-.148-.16-.391-.199-.578-.09L14.875 4.297c-.699-.602-1.504-1.066-2.375-1.371V1.008c0-.219-.152-.41-.367-.457-1.434-.32-2.902-.305-4.266 0-.215.047-.367.238-.367.457V2.93c-.867.309-1.672.773-2.375 1.371L3.465 3.34c-.191-.109-.43-.074-.578.09-.965 1.043-1.703 2.301-2.137 3.695-.066.211 .023.437 .215.547L2.629 8.633c-.168.906-.168 1.836 0 2.742l-1.664.961c-.191.109-.277.336-.215.547 .434 1.391 1.172 2.648 2.137 3.695.148 .16.391 .199.578 .09l1.664-.961c.699.602 1.504 1.066 2.375 1.371v1.922c0 .219.152 .41.367 .457 1.434.32 2.902.305 4.266 0 .215-.047.367-.238.367-.457v-1.922c.867-.309 1.672-.773 2.375-1.371l1.664.961c.191.109 .43.074 .578-.09.965-1.043 1.703-2.301 2.137-3.695.059-.215-.027-.441-.219-.551zM10 13.125c-1.723 0-3.125-1.402-3.125-3.125s1.402-3.125 3.125-3.125 3.125 1.402 3.125 3.125-1.402 3.125-3.125 3.125z");
		this.menuToggle.appendChild(svg);
		svg.appendChild(path);
		this.menuToggle.addEventListener("mousedown", function(e) {
			
			e.preventDefault();
			
		});
		this.menuToggle.addEventListener("click", function() {
			
			console.log(document.getElementById("w-settings"));
			if(this.wrapper) {
				
				this.hideSettings();
				
			} else {
				
				this.showSettings();
				
			}
			
		}.bind(this));
		
	}
	hideSettingsToggle() {
		
		if(this.menuToggle) {
			
			this.menuToggle.style.opacity = "0";
			this.menuToggle.style.transform = "scale(0.3)";
			window.setTimeout(function() {
				
				if(document.activeElement !== this.node) {
					
					this.menuToggle.remove();
					
				}
				
			}.bind(this), 200);
			
		}
		this.hideSettings();
		
	}
	showSettings() {
		
		this.wrapper = this.el.appendChild(document.createElement("div"));
		this.wrapper.id = "w-settings";
		this.optionsEl = this.wrapper.appendChild(document.createElement("div"));
		this.optionsEl.className = "w-settings__column";
		this.settings = this.wrapper.appendChild(document.createElement("div"));
		this.settings.className = "w-settings__column";
		this.existing = [];
		this.addSettings(this.writer.settings, this.settings);
		this.addSettings(this.writer.options, this.optionsEl);
		if(this.options.length == 0) this.wrapper.style.right = "-40px";
		
	}
	addSettings(obj, parent) {
		
		this.existing[obj] = [];
		for(var key of Object.keys(obj)) {
			
			if(!this.options.includes(key.split("-")[0]) && obj == this.writer.options) continue;
			if(this.existing[obj][key.split("-")[0]] !== undefined) {
				
				this.existing[obj][key.split("-")[0]] ++;
				
			} else {
				
				this.existing[obj][key.split("-")[0]] = 1;
				var input = parent.appendChild(document.createElement("div"));
				input.className = "w-settings__item";
				input.id = "w-settings__item--" + key.split("-")[0];
				input.setAttribute("focusable", "false");
				var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
				var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
				if(key.split("-").length > 1) {
					
					path.setAttribute("d", obj[key.split("-")[0] + "-" + this.el.getAttribute("data-" + key.split("-")[0])]);
					
				} else {
					
					path.setAttribute("d", obj[key]);
					
				}
				input.style.transform = "translateY(-" + (30 * (Object.keys(this.existing).indexOf(key.split("-")[0]) + 1)) + "px)";
				input.appendChild(svg);
				svg.appendChild(path);
				input.addEventListener("mousedown", function(e) {
					
					e.preventDefault();
					
				});
				switch(key.split("-")[0]) {
					
					case "delete":
						input.addEventListener("click", function(e) {
							
							if(document.getElementById("w-settings__item--delete").classList.contains("w-settings__item--confirm")) {
								
								var id = this.writer.getFocusedBlock();
								this.remove();
								this.writer.blocks.splice(id, 1);
								if(this.writer.blocks.length == 0 || (id == 0 && this.writer.fullBlocks.includes(this.writer.blocks[0].type) || (id > 0 && this.writer.fullBlocks.includes(this.writer.blocks[id - 1].type)))) {
									
									if((this.writer.blocks.length != 0 && this.writer.fullBlocks.includes(this.writer.blocks[this.writer.blocks.length - 1].type)) || this.writer.blocks.length == 0) {
										
										this.writer.blocks.push(new Block(this.writer, "paragraph", false));
										
									} else {
										
										this.writer.blocks[this.writer.blocks.length - 1].focus();
										
									}
									
								}
								
							} else {
								
								document.getElementById("w-settings__item--delete").classList.add("w-settings__item--confirm");
								
							}
							
						}.bind(this));
						break;
					case "up":
						input.addEventListener("click", function(e) {
							
							this.shiftUp();
							
						}.bind(this));
						break;
					case "down":
						input.addEventListener("click", function(e) {
							
							this.shiftDown();
							
						}.bind(this));
						break;
					case "align":
						this.incSetting(obj, input, "align");
						break;
					case "border":
						this.incSetting(obj, input, "border");
						break;
					
				}
				
			}
			
		}
		
	}
	incSetting(obj, input, setting) {
		
		input.addEventListener("click", function(e) {
			
			var curr = Number(this.el.getAttribute("data-" + setting)) + 1;
			if(curr > this.existing[obj][setting] - 1) curr = 0;
			input.querySelector("path").setAttribute("d", this.writer.options[setting + "-" + curr]);
			this.el.setAttribute("data-" + setting, curr);
			
		}.bind(this));
		
	}
	hideSettings() {
		
		if(this.wrapper) {
			
			this.wrapper.style.animation = "w-fade--out 0.2s forwards";
			this.wrapper.id = "";
			this.wrapper.className = "w-settings__fade";
			var settingsFade = this.wrapper;
			delete this.wrapper;
			window.setTimeout(function() {
				
				settingsFade.remove();
				
				
			}.bind(this), 200);
			delete this.settings;
			delete this.optionsEl;
			delete this.existing;
			
		}
		
	}
	shiftUp() {
		
		var index = this.getBlockIndex();
		if(index == 0) return;
		var temp = this.writer.blocks[index];
		this.writer.blocks[index] = this.writer.blocks[index - 1];
		this.writer.blocks[index - 1] = temp;
		this.el.parentNode.insertBefore(this.el.parentNode.childNodes[index + 2], this.el.parentNode.childNodes[index + 1]);
		this.node.focus();
		this.showSettingsToggle();
		this.showSettings();
		
	}
	shiftDown() {
		
		var index = this.getBlockIndex();
		if(index == this.writer.blocks.length - 1) return;
		var temp = this.writer.blocks[index];
		this.writer.blocks[index] = this.writer.blocks[index + 1];
		this.writer.blocks[index + 1] = temp;
		if(index == this.writer.blocks.length - 2) {
			
			this.el.parentNode.appendChild(this.el.parentNode.childNodes[index + 2]);
			
		} else {
			
			this.el.parentNode.insertBefore(this.el.parentNode.childNodes[index + 3], this.el.parentNode.childNodes[index + 2]);
			
		}
		this.node.focus();
		this.showSettingsToggle();
		this.showSettings();
		
	}
	
}
class DelimiterBlock extends Block {
	
	constructor(writer, type = "delimiter", focused = writer.getFocusedBlock(), replace = false) {
		
		super(writer, type, focused, replace);
		
	}
	add() {
		
		this.options = ["align"];
		this.node = this.el.appendChild(document.createElement("div"));
		this.node.className = "w-block__delimiter";
		this.node.tabIndex = "0";
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "m3.6 14.2c-1.99 0-3.6 1.61-3.6 3.6 0 1.99 1.61 3.6 3.6 3.6 1.99 0 3.6-1.61 3.6-3.6 0-1.99-1.61-3.6-3.6-3.6zm25.6 0c-1.99 0-3.6 1.61-3.6 3.6 0 1.99 1.61 3.6 3.6 3.6 1.99 0 3.6-1.61 3.6-3.6 0-1.99-1.61-3.6-3.6-3.6zm-9.2 3.6c0 1.99-1.61 3.6-3.6 3.6-1.99 0-3.6-1.61-3.6-3.6 0-1.99 1.61-3.6 3.6-3.6 1.99 0 3.6 1.61 3.6 3.6z");
		this.node.appendChild(svg);
		svg.appendChild(path);
		this.node.addEventListener("focus", function() {
			
			this.el.classList.add("w-block--focused");
			this.showSettingsToggle();
			
		}.bind(this));
		this.node.addEventListener("click", function() {
			
			var settingsToggle = document.getElementById("w-settings__toggle");
			if(!settingsToggle) this.showSettingsToggle();
			
		}.bind(this));
		this.node.addEventListener("blur", function() {
			
			this.el.classList.remove("w-block--focused");
			this.writer.hideMenuToggle();
			this.hideSettingsToggle();
			
		}.bind(this));
		this.options.forEach(function(setting) {
			
			this.el.setAttribute("data-" + setting, "0");
			
		}.bind(this));
		
	}
	
}
class ImageBlock extends Block {
	
	static uid = 0;
	constructor(writer, type = "image", focused = writer.getFocusedBlock(), replace = false) {
		
		super(writer, type, focused, replace);
		this.src = "";
		
	}
	add() {
		
		this.options = ["align"];
		this.id = ImageBlock.uniqueID();
		this.node = this.el.appendChild(document.createElement("div"));
		this.node.className = "w-block__" + this.type;
		this.node.tabIndex = "0";
		this.nodeContent = this.node.appendChild(document.createElement("div"));
		this.nodeContent.className = "w-block__image__upload";
		this.nodeContent.innerHTML = "<input id = 'w-input__file--" + this.id + "' class = 'w-input__file' type = 'file'> <label class = 'w-label' for = 'w-input__file--" + this.id + "'> Choose Image to Upload <button id = 'w-input__button--" + this.id + "' class = 'w-input__button'> Display from URL </button> </label>";
		this.node.addEventListener("focus", function() {
			
			this.el.classList.add("w-block--focused");
			this.showSettingsToggle();
			
		}.bind(this));
		this.node.addEventListener("click", function() {
			
			var settingsToggle = document.getElementById("w-settings__toggle");
			if(!settingsToggle) this.showSettingsToggle();
			
		}.bind(this));
		this.node.addEventListener("blur", function() {
			
			this.el.classList.remove("w-block--focused");
			this.hideSettingsToggle();
			
		}.bind(this));
		this.input = document.getElementById("w-input__file--" + this.id);
		this.input.addEventListener("change", function() {
			
			this.parseFile(this.input.files[0]);
			
		}.bind(this));
		document.getElementById("w-input__button--" + this.id).addEventListener("click", function() {
			
			var url = prompt("Enter Image Address");
			if(url == null) return false;
			if(url.match(/\.(jpeg|jpg|gif|png|bmp|webp)$/) == null) return false;
			this.parseFile(url);
			
		}.bind(this));
		this.options.forEach(function(setting) {
			
			this.el.setAttribute("data-" + setting, "0");
			
		}.bind(this));
		
	}
	parseFile(file) {
		
		if(typeof file === "string" || file instanceof String) {
			
			this.src = file;
			this.loadImage();
			
		} else {
			
			this.parseImage(file);
			
		}
		
	}
	parseImage(file) {
		
		var accepted = ["image/jpeg", "image/bmp", "image/gif", "image/png", "image/webp"];
		if(!accepted.includes(file["type"])) return false;
		var reader = new FileReader();
		if(file["type"] == "image/gif") {
			
			reader.readAsDataURL(file);
			
		} else {
			
			reader.readAsArrayBuffer(file);
			
		}
		reader.onload = function(e) {
			
			if(file["type"] == "image/gif") {
				
				this.src = reader.result;
				this.loadImage();
				
			} else {
				
				var img = new Image();
				img.src = URL.createObjectURL(new Blob([e.target.result]));
				var canvas = document.createElement("canvas");
				img.onload = function() {
					
					var width = img.width;
					var height = img.height;
					if(img.height > 1000 || img.width > 1500) {
						
						if(img.height < img.width) {
							
							width = 1500;
							height = img.height / img.width * width;
							
						} else {
							
							height = 1000;
							width = img.width / img.height * height;
							
						}
						
					}
					canvas.width = width;
					canvas.height = height;
					canvas.getContext("2d").drawImage(img, 0, 0, width, height);
					this.src = canvas.toDataURL(file["type"], this.writer.getConfig().imageQuality);
					this.loadImage();
					
				}.bind(this);
				
			}
			
		}.bind(this);
		
	}
	loadImage() {
		
		this.nodeContent.remove();
		this.nodeContent = this.node.appendChild(document.createElement("div"));
		this.nodeContent.className = "w-image__resize";
		this.imageTag = this.nodeContent.appendChild(document.createElement("img"));
		this.imageTag.src = this.src;
		this.imageTag.setAttribute("draggable", false);
		this.imageTag.className = "w-image";
		var resizer = document.createElement("div");
		resizer.className = "w-image__resize__handle";
		this.nodeContent.appendChild(resizer);
		resizer.setAttribute("draggable", false);
		resizer.addEventListener("mousedown", startDrag.bind(this));
		var maxWidth = parseInt(document.defaultView.getComputedStyle(this.nodeContent).width, 10);
		var elem, startX, startY, startW, startH;
		function startDrag(e) {
			
			elem = this.nodeContent;
			startX = e.clientX;
			startY = e.clientY;
			startW = parseInt(document.defaultView.getComputedStyle(this.nodeContent).width, 10);
			startH = parseInt(document.defaultView.getComputedStyle(this.nodeContent).height, 10);
			elem.style.maxWidth = maxWidth + "px";
			document.documentElement.addEventListener("mousemove", resize);
			document.documentElement.addEventListener("mouseup", stopDrag);
			
		}
		function resize(e) {
			
			elem.style.width = (startW + e.clientX - startX) + "px";
			
		}
		function stopDrag() {
			
			var endWidth = parseInt(document.defaultView.getComputedStyle(elem).width, 10);
			if(endWidth >= maxWidth) elem.removeAttribute("style");
			if(endWidth <= 100) elem.style.width = "100px";
			elem.style.maxWidth = null;
			document.documentElement.removeEventListener("mousemove", resize);
			document.documentElement.removeEventListener("mouseup", stopDrag);
			
		}
		
	}
	static uniqueID() {
		
		this.uid ++;
		return this.uid;
		
	}
	
}
class QuoteBlock extends Block {
	
	constructor(writer, type = "quote", focused = writer.getFocusedBlock(), replace = false) {
		
		super(writer, type, focused, replace);
		
	}
	add() {
		
		this.options = [];
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "M18.125 10h-3.125v-2.5c0-1.379 1.121-2.5 2.5-2.5h.313c.52 0 .938-.418.938-.937V2.188c0-.52-.418-.937-.937-.937h-.312c-3.453 0-6.25 2.797-6.25 6.25v9.375c0 1.035.84 1.875 1.875 1.875h5c1.035 0 1.875-.84 1.875-1.875V11.875c0-1.035-.84-1.875-1.875-1.875zm-11.25 0H3.75v-2.5c0-1.379 1.121-2.5 2.5-2.5h.313c.52 0 .938-.418.938-.937V2.188c0-.52-.418-.937-.937-.937h-.312C2.797 1.25 0 4.047 0 7.5v9.375c0 1.035.84 1.875 1.875 1.875h5c1.035 0 1.875-.84 1.875-1.875V11.875c0-1.035-.84-1.875-1.875-1.875z");
		svg.appendChild(path);
		this.el.appendChild(svg);
		svg.setAttribute("class", "w-quote__icon");
		this.el.classList.add("w-block--focused");
		this.node = this.el.appendChild(document.createElement("div"));
		this.node.className = "w-block__quote";
		this.node.contentEditable = true;
		this.node.addEventListener("focus", function() {
			
			this.el.classList.add("w-block--focused");
			this.showSettingsToggle();
			
		}.bind(this));
		this.node.addEventListener("click", function() {
			
			var settingsToggle = document.getElementById("w-settings__toggle");
			if(!settingsToggle) this.showSettingsToggle();
			
		}.bind(this));
		this.node.addEventListener("blur", function() {
			
			this.el.classList.remove("w-block--focused");
			this.writer.hideMenuToggle();
			this.hideSettingsToggle();
			
		}.bind(this));
		this.node.focus();
		this.options.forEach(function(setting) {
			
			this.el.setAttribute("data-" + setting, "0");
			
		}.bind(this));
		
	}
	
}
class EmbedBlock extends Block {
	
	constructor(writer, type = "embed", focused = writer.getFocusedBlock(), replace = false) {
		
		super(writer, type, focused, replace);
		this.src = "";
		
	}
	add() {
		
		this.options = ["align", "border"];
		this.id = ImageBlock.uniqueID();
		this.node = this.el.appendChild(document.createElement("div"));
		this.node.className = "w-block__" + this.type;
		this.node.tabIndex = "0";
		this.nodeContent = this.node.appendChild(document.createElement("div"));
		this.nodeContent.className = "w-embed__select";
		this.nodeContent.innerHTML = "Embed Media from URL <br>";
		for(var key of Object.keys(this.writer.embeds)) {
			
			var input = this.nodeContent.appendChild(document.createElement("div"));
			var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
			var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
			path.setAttribute("d", this.writer.embeds[key]);
			svg.appendChild(path);
			input.appendChild(svg);
			input.className = "w-embed__select__item";
			this.nodeContent.appendChild(input);
			
		}
		this.node.addEventListener("focus", function() {
			
			this.el.classList.add("w-block--focused");
			this.showSettingsToggle();
			
		}.bind(this));
		this.node.addEventListener("click", function() {
			
			var settingsToggle = document.getElementById("w-settings__toggle");
			if(!settingsToggle) this.showSettingsToggle();
			
		}.bind(this));
		this.node.addEventListener("blur", function() {
			
			this.el.classList.remove("w-block--focused");
			this.hideSettingsToggle();
			
		}.bind(this));
		this.nodeContent.addEventListener("click", function() {
			
			var url = prompt("Enter Media Address");
			if(url == null) return false;
			this.embed(url);
			
		}.bind(this));
		this.options.forEach(function(setting) {
			
			this.el.setAttribute("data-" + setting, "0");
			
		}.bind(this));
		
	}
	embed(url, formatted = false) {
		
		var sites = ["instagram", "twitter", "youtube", "facebook"];
		var el = document.createElement("a");
		el.href = url;
		var site = false;
		sites.forEach(function(s) {
			
			var host = el.hostname.toLowerCase();
			if(host.includes(s)) site = s;
			
		});
		if(!site) return;
		if(!formatted) switch(site) {
			
			case "instagram":
				if(url.slice(-1) == "/") url = url.substr(0, url.length - 1);
				this.src = url + "/embed/captioned";
				break;
			case "twitter":
				this.src = "https://platform.twitter.com/embed/index.html?id=" + el.pathname.split("/").pop();
				break;
			case "youtube":
				this.src = "https://www.youtube.com/embed/" + el.search.split("?v=")[1];
				break;
			case "facebook":
				this.src = "https://www.facebook.com/plugins/post.php?href=" + encodeURIComponent(url);
				break;
			default:
				return false;
			
		} else this.src = url;
		this.nodeContent.remove();
		this.nodeContent = this.node.appendChild(document.createElement("div"));
		this.nodeContent.className = "w-embed__resize";
		this.nodeContent.style.height = "200px";
		this.iframe = this.nodeContent.appendChild(document.createElement("iframe"));
		this.iframe.src = this.src;
		this.iframe.setAttribute("draggable", false);
		this.iframe.className = "w-embed";
		var resizer = document.createElement("div");
		resizer.className = "w-embed__resize__handle";
		this.nodeContent.appendChild(resizer);
		resizer.setAttribute("draggable", false);
		resizer.addEventListener("mousedown", startDrag);
		var maxWidth = parseInt(document.defaultView.getComputedStyle(this.nodeContent).width, 10);
		var elem, startX, startY, startW, startH;
		var self = this;
		function startDrag(e) {
			
			elem = self.nodeContent;
			startX = e.clientX;
			startY = e.clientY;
			startW = parseInt(document.defaultView.getComputedStyle(self.nodeContent).width, 10);
			startH = parseInt(document.defaultView.getComputedStyle(self.nodeContent).height, 10);
			elem.style.maxWidth = maxWidth + "px";
			document.documentElement.addEventListener("mousemove", resize);
			document.documentElement.addEventListener("mouseup", stopDrag);
			
		}
		function resize(e) {
			
			elem.style.width = (startW + e.clientX - startX) + "px";
			elem.style.height = (startH + e.clientY - startY) + "px";
			
		}
		function stopDrag() {
			
			var endWidth = parseInt(document.defaultView.getComputedStyle(elem).width, 10);
			if(endWidth >= maxWidth) elem.removeAttribute("style");
			if(endWidth <= 100) elem.style.width = "100px";
			elem.style.maxWidth = null;
			document.documentElement.removeEventListener("mousemove", resize);
			document.documentElement.removeEventListener("mouseup", stopDrag);
			
		}
		
	}
	
}
class LinkBlock extends Block {
	
	constructor(writer, type = "link", focused = writer.getFocusedBlock(), replace = false) {
		
		super(writer, type, focused, replace);
		this.src = "";
		
	}
	add() {
		
		this.options = [];
		this.el.classList.add("w-block--focused");
		this.nodeWrap = this.el.appendChild(document.createElement("div"));
		this.nodeWrap.className = "w-block__link";
		this.icon = this.nodeWrap.appendChild(document.createElement("div"));
		this.icon.className = "w-link__icon";
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", this.writer.inputs["link"]);
		svg.appendChild(path);
		this.icon.appendChild(svg);
		this.node = this.nodeWrap.appendChild(document.createElement("div"));
		this.node.contentEditable = true;
		this.node.className = "w-link__url";
		this.node.addEventListener("focus", function() {
			
			this.el.classList.add("w-block--focused");
			this.showSettingsToggle();
			
		}.bind(this));
		this.node.addEventListener("click", function() {
			
			var settingsToggle = document.getElementById("w-settings__toggle");
			if(!settingsToggle) this.showSettingsToggle();
			
		}.bind(this));
		this.node.addEventListener("blur", function() {
			
			this.el.classList.remove("w-block--focused");
			this.writer.hideMenuToggle();
			this.hideSettingsToggle();
			
		}.bind(this));
		this.node.addEventListener("input", function() {
			
			this.src = this.node.textContent;
			
		}.bind(this));
		this.node.focus();
		this.options.forEach(function(setting) {
			
			this.el.setAttribute("data-" + setting, "0");
			
		}.bind(this));
		
	}
	
}