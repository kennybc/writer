class Loader {
	
	static parse(wrapper, blockJSON) {
		
		wrapper = document.getElementById(wrapper);
		if(!wrapper || wrapper == null) {
			
			console.log("Invalid wrapper element");
			return;
			
		}
		var blockObj = JSON.parse(blockJSON);
		wrapper.innerHTML = "";
		for(var i = 0; i < blockObj.blocks.length; i ++) {
			
			addBlock(wrapper, blockObj.blocks[i]);
			
		}
		function addBlock(el, block) {
			
			var types = {
				
				"paragraph": () => { new ParagraphBlock(el, block) },
				"heading": () => { new HeadingBlock(el, block) },
				"image": () => { new ImageBlock(el, block) },
				"embed": () => { new EmbedBlock(el, block) },
				"quote": () => { new QuoteBlock(el, block) },
				"link": () => { new LinkBlock(el, block) },
				"delimiter": () => { new DelimiterBlock(el, block) }
				
			}
			types[block.type].call();
			
		}
		
	}
	
}
class Block {
	
	constructor(wrapper, data) {
		
		this.wrapper = wrapper;
		this.data = data;
		this.init();
		
	}
	init() {
		
		this.el = this.wrapper.appendChild(document.createElement("div"));
		this.el.className = "w-block";
		this.configure();
		
	}
	configure() {}
	
}
class ParagraphBlock extends Block {
	
	configure() {
		
		this.node = this.el.appendChild(document.createElement("div"));
		this.node.className = "w-block__paragraph";
		this.node.innerHTML = this.data.content;
		this.el.setAttribute("data-align", this.data.align);
		
	}
	
}
class HeadingBlock extends Block {
	
	configure() {
		
		this.node = this.el.appendChild(document.createElement("div"));
		this.node.className = "w-block__heading";
		this.node.innerHTML = this.data.content;
		this.el.setAttribute("data-align", this.data.align);
		
	}
	
}
class ImageBlock extends Block {
	
	configure() {
		
		this.node = this.el.appendChild(document.createElement("div"));
		this.node.className = "w-block__image";
		this.resize = this.node.appendChild(document.createElement("div"));
		this.resize.className = "w-image__resize";
		this.resize.style.width = this.data.width;
		this.image = this.resize.appendChild(document.createElement("img"));
		this.image.src = this.data.src;
		this.image.className = "w-image";
		this.el.setAttribute("data-align", this.data.align);
		
	}
	
}
class EmbedBlock extends Block {
	
	configure() {
		
		this.node = this.el.appendChild(document.createElement("div"));
		this.node.className = "w-block__embed";
		this.resize = this.node.appendChild(document.createElement("div"));
		this.resize.className = "w-embed__resize";
		this.resize.style.width = this.data.width;
		this.resize.style.height = this.data.height;
		this.embed = this.resize.appendChild(document.createElement("iframe"));
		this.embed.src = this.data.src;
		this.embed.className = "w-embed";
		this.el.setAttribute("data-align", this.data.align);
		this.el.setAttribute("data-border", this.data.border);
		
	}
	
}
class QuoteBlock extends Block {
	
	configure() {
		
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "M18.125 10h-3.125v-2.5c0-1.379 1.121-2.5 2.5-2.5h.313c.52 0 .938-.418.938-.937V2.188c0-.52-.418-.937-.937-.937h-.312c-3.453 0-6.25 2.797-6.25 6.25v9.375c0 1.035.84 1.875 1.875 1.875h5c1.035 0 1.875-.84 1.875-1.875V11.875c0-1.035-.84-1.875-1.875-1.875zm-11.25 0H3.75v-2.5c0-1.379 1.121-2.5 2.5-2.5h.313c.52 0 .938-.418.938-.937V2.188c0-.52-.418-.937-.937-.937h-.312C2.797 1.25 0 4.047 0 7.5v9.375c0 1.035.84 1.875 1.875 1.875h5c1.035 0 1.875-.84 1.875-1.875V11.875c0-1.035-.84-1.875-1.875-1.875z");
		svg.appendChild(path);
		this.el.appendChild(svg);
		svg.setAttribute("class", "w-quote__icon");
		this.node = this.el.appendChild(document.createElement("div"));
		this.node.className = "w-block__quote";
		this.node.innerHTML = this.data.content;
		this.el.setAttribute("data-align", this.data.align);
		
	}
	
}
class LinkBlock extends Block {
	
	configure() {
		
		this.node = this.el.appendChild(document.createElement("a"));
		this.node.className = "w-block__link";
		this.icon = this.node.appendChild(document.createElement("div"));
		this.icon.className = "w-link__icon";
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "M12.758 7.242c2.334 2.336 2.302 6.082.014 8.382-.004.005-.009.01-.014.014l-2.625 2.625c-2.315 2.315-6.082 2.315-8.397 0-2.315-2.315-2.315-6.082 0-8.397l1.449-1.449c.384-.384 1.046-.129 1.066.414 .025.692 .149 1.388.379 2.059.078 .227.022 .479-.148.649l-.511.511c-1.095 1.095-1.129 2.877-.045 3.983 1.095 1.116 2.894 1.123 3.997.02l2.625-2.625c1.101-1.101 1.097-2.881 0-3.978-.145-.144-.29-.256-.404-.335a.626.626 0 0 1-.271-.492c-.015-.413.131-.838.457-1.164l.822-.822c.216-.216.554-.242.804-.068a5.956 5.956 0 0 1 .802.672zM18.264 1.736c-2.315-2.315-6.082-2.315-8.397 0l-2.625 2.625c-.005.005-.01.01-.014.014-2.288 2.3-2.32 6.046.014 8.382a5.955 5.955 0 0 0 .802.672c.25.175 .588.148 .804-.068l.822-.822c.326-.326.472-.752.457-1.164a.626.626 0 0 0-.271-.492c-.114-.078-.259-.19-.404-.335-1.097-1.097-1.101-2.877 0-3.978l2.625-2.625c1.103-1.103 2.902-1.096 3.997.02 1.084 1.105 1.05 2.888-.045 3.983l-.511.511c-.17.17-.225.421-.148.649 .229.672 .353 1.367.379 2.059.02 .543.682 .799 1.066.414l1.449-1.449c2.315-2.315 2.315-6.082 0-8.397z");
		svg.appendChild(path);
		this.icon.appendChild(svg);
		this.link = this.node.appendChild(document.createElement("div"));
		this.link.className = "w-link__url";
		this.link.innerHTML = this.data.href;
		this.node.href = this.data.href;
		this.node.target = "_blank";
		
	}
	
}
class DelimiterBlock extends Block {
	
	configure() {
		
		this.node = this.el.appendChild(document.createElement("div"));
		this.node.className = "w-block__delimiter";
		var svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
		var path = document.createElementNS("http://www.w3.org/2000/svg", "path");
		path.setAttribute("d", "m3.6 14.2c-1.99 0-3.6 1.61-3.6 3.6 0 1.99 1.61 3.6 3.6 3.6 1.99 0 3.6-1.61 3.6-3.6 0-1.99-1.61-3.6-3.6-3.6zm25.6 0c-1.99 0-3.6 1.61-3.6 3.6 0 1.99 1.61 3.6 3.6 3.6 1.99 0 3.6-1.61 3.6-3.6 0-1.99-1.61-3.6-3.6-3.6zm-9.2 3.6c0 1.99-1.61 3.6-3.6 3.6-1.99 0-3.6-1.61-3.6-3.6 0-1.99 1.61-3.6 3.6-3.6 1.99 0 3.6 1.61 3.6 3.6z");
		this.node.appendChild(svg);
		svg.appendChild(path);
		this.el.setAttribute("data-align", this.data.align);
		
	}
	
}