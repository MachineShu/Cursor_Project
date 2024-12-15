class CardEditor {
    constructor() {
        this.templateSystem = new TemplateSystem();
        this.currentTemplate = null;
        this.initializeElements();
        this.bindEvents();
        this.loadSelectedText();
    }

    // 初始化DOM元素
    initializeElements() {
        this.elements = {
            cardContent: document.getElementById('cardContent'),
            bgType: document.getElementById('bgType'),
            bgColor: document.getElementById('bgColor'),
            fontFamily: document.getElementById('fontFamily'),
            fontSize: document.getElementById('fontSize'),
            fontColor: document.getElementById('fontColor'),
            textAlign: document.getElementById('textAlign'),
            padding: document.getElementById('padding'),
            enableShadow: document.getElementById('enableShadow'),
            enableBorder: document.getElementById('enableBorder'),
            templateList: document.getElementById('templateList')
        };

        // 加载字体列表
        const fonts = [
            'Arial', 'Helvetica', 'Times New Roman', 'Georgia', 
            'Microsoft YaHei', 'SimSun', 'SimHei', 'KaiTi'
        ];
        fonts.forEach(font => {
            const option = document.createElement('option');
            option.value = font;
            option.textContent = font;
            this.elements.fontFamily.appendChild(option);
        });
    }

    // 绑定事件
    bindEvents() {
        // 样式更改事件
        this.elements.bgType.addEventListener('change', () => this.updateStyle());
        this.elements.bgColor.addEventListener('input', () => this.updateStyle());
        this.elements.fontFamily.addEventListener('change', () => this.updateStyle());
        this.elements.fontSize.addEventListener('input', () => this.updateStyle());
        this.elements.fontColor.addEventListener('input', () => this.updateStyle());
        this.elements.textAlign.addEventListener('change', () => this.updateStyle());
        this.elements.padding.addEventListener('input', () => this.updateStyle());
        this.elements.enableShadow.addEventListener('change', () => this.updateStyle());
        this.elements.enableBorder.addEventListener('change', () => this.updateStyle());

        // 模板相关事件
        document.getElementById('importTemplate').addEventListener('click', () => this.importTemplate());
        document.getElementById('exportTemplate').addEventListener('click', () => this.exportTemplate());
        document.getElementById('saveTemplate').addEventListener('click', () => this.saveAsTemplate());
    }

    // 加载选中的文本
    async loadSelectedText() {
        const result = await chrome.storage.local.get('selectedText');
        if (result.selectedText) {
            this.elements.cardContent.textContent = result.selectedText;
            chrome.storage.local.remove('selectedText');
        }
    }

    // 更新卡片样式
    updateStyle() {
        const styles = {
            background: this.elements.bgType.value === 'color' 
                ? this.elements.bgColor.value 
                : this.getGradientBackground(),
            fontFamily: this.elements.fontFamily.value,
            fontSize: `${this.elements.fontSize.value}px`,
            color: this.elements.fontColor.value,
            textAlign: this.elements.textAlign.value,
            padding: `${this.elements.padding.value}px`,
            boxShadow: this.elements.enableShadow.checked 
                ? '0 4px 8px rgba(0,0,0,0.1)' 
                : 'none',
            border: this.elements.enableBorder.checked 
                ? '1px solid #ddd' 
                : 'none'
        };

        Object.assign(this.elements.cardContent.style, styles);
    }

    // 获取渐变背景
    getGradientBackground() {
        if (this.elements.bgType.value !== 'gradient') return '';
        return `linear-gradient(45deg, ${this.elements.bgColor.value}, #ffffff)`;
    }

    // 导入模板
    async importTemplate() {
        const input = document.createElement('input');
        input.type = 'file';
        input.accept = '.json';
        input.onchange = async (e) => {
            try {
                const template = await this.templateSystem.importTemplate(e.target.files[0]);
                this.applyTemplate(template);
            } catch (err) {
                console.error('导入模板失败:', err);
            }
        };
        input.click();
    }

    // 导出模板
    exportTemplate() {
        const template = {
            name: prompt('请输入模板名称:'),
            styles: this.getCurrentStyles()
        };
        this.templateSystem.exportTemplate(template);
    }

    // 保存为模板
    async saveAsTemplate() {
        const name = prompt('请输入模板名称:');
        if (!name) return;

        const template = {
            name,
            styles: this.getCurrentStyles()
        };

        await this.templateSystem.saveTemplate(template);
        this.updateTemplateList();
    }

    // 获取当前样式
    getCurrentStyles() {
        return {
            background: this.elements.cardContent.style.background,
            fontFamily: this.elements.fontFamily.value,
            fontSize: this.elements.fontSize.value,
            color: this.elements.fontColor.value,
            textAlign: this.elements.textAlign.value,
            padding: this.elements.padding.value,
            shadow: this.elements.enableShadow.checked,
            border: this.elements.enableBorder.checked
        };
    }

    // 应用模板
    applyTemplate(template) {
        const { styles } = template;
        this.elements.fontFamily.value = styles.fontFamily;
        this.elements.fontSize.value = styles.fontSize;
        this.elements.fontColor.value = styles.color;
        this.elements.textAlign.value = styles.textAlign;
        this.elements.padding.value = styles.padding;
        this.elements.enableShadow.checked = styles.shadow;
        this.elements.enableBorder.checked = styles.border;

        this.updateStyle();
    }

    // 更新模板列表
    updateTemplateList() {
        this.elements.templateList.innerHTML = '';
        this.templateSystem.templates.forEach(template => {
            const div = document.createElement('div');
            div.className = 'template-item';
            div.textContent = template.name;
            div.onclick = () => this.applyTemplate(template);
            this.elements.templateList.appendChild(div);
        });
    }
} 