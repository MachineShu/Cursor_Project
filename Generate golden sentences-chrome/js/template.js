class TemplateSystem {
    constructor() {
        this.templates = [];
        this.loadTemplates();
    }

    // 加载预设模板
    async loadTemplates() {
        const defaultTemplates = [
            {
                name: "简约白",
                styles: {
                    background: "#ffffff",
                    fontFamily: "Arial",
                    fontSize: "18px",
                    color: "#333333",
                    padding: "20px",
                    textAlign: "center",
                    shadow: false,
                    border: false
                }
            },
            {
                name: "暗夜模式",
                styles: {
                    background: "#2c2c2c",
                    fontFamily: "Helvetica",
                    fontSize: "20px",
                    color: "#ffffff",
                    padding: "25px",
                    textAlign: "center",
                    shadow: true,
                    border: false
                }
            },
            // 更多预设模板...
        ];

        // 从存储中加���用户模板
        const stored = await this.getStoredTemplates();
        this.templates = [...defaultTemplates, ...stored];
    }

    // 获取存储的模板
    async getStoredTemplates() {
        return new Promise((resolve) => {
            chrome.storage.local.get('userTemplates', (result) => {
                resolve(result.userTemplates || []);
            });
        });
    }

    // 保存模板
    async saveTemplate(template) {
        this.templates.push(template);
        await this.updateStorage();
    }

    // 更新存储
    async updateStorage() {
        return new Promise((resolve) => {
            chrome.storage.local.set({
                userTemplates: this.templates.filter(t => !t.isDefault)
            }, resolve);
        });
    }

    // 导出模板
    exportTemplate(template) {
        const blob = new Blob([JSON.stringify(template)], {type: 'application/json'});
        const url = URL.createObjectURL(blob);
        
        const a = document.createElement('a');
        a.href = url;
        a.download = `template-${template.name}.json`;
        a.click();
        
        URL.revokeObjectURL(url);
    }

    // 导入模板
    async importTemplate(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (e) => {
                try {
                    const template = JSON.parse(e.target.result);
                    await this.saveTemplate(template);
                    resolve(template);
                } catch (err) {
                    reject(err);
                }
            };
            reader.readAsText(file);
        });
    }
} 