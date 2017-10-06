import React from 'react';
import FontAwesome from 'react-fontawesome';

import Storage from '../Storage';

class TemplatesPanel extends React.Component {
  constructor(props) {
    super(props);

    this.handleTemplateSelected = this.handleTemplateSelected.bind(this);
    this.handleTemplateRemoved = this.handleTemplateRemoved.bind(this);
    this.handleTemplateStartEdit = this.handleTemplateStartEdit.bind(this);
  }

  handleTemplateSelected(templateText) {
    this.props.onTemplateSelected(templateText);
  }

  handleTemplateStartEdit(title, text) {
    // todo
  }

  handleTemplateRemoved(templateId) {
    Storage.removeTemplate(templateId);
  }

  render() {
    const noSavedTemplatesMessage = <div style={{ padding: '1em' }}>
        Currently you have no saved templates.</div>;
    const templatesDisabledMessage = <div style={{ padding: '1em', color: '#e22' }}>
        Templates disabled. You must select an editable text area in the page first.</div>;

    return (
      <div className="templates-list">
        <div className="panel-title"><FontAwesome name='file-text' fixedWidth={true} /> Templates (click to paste)</div>
        <div>
          {this.props.templates.length == 0 && noSavedTemplatesMessage}
          {this.props.templatesDisabled && templatesDisabledMessage}
          {this.props.templates.map(({ title, text, id }) => {
            return (
              <div className="templates-list-item" key={id}
                  onClick={() => {
                    if (!this.props.templatesDisabled) {
                      this.handleTemplateSelected(text);
                    }
                  }}>
                <span title={`Template: "${text}"`}>
                  <span>{title}</span>
                </span>
                <span>
                  <FontAwesome className="templates-list-item-edit" name='pencil'
                    style={{ marginRight: '10px' }}
                    onClick={(e) => {
                      e.stopPropagation();
                      this.handleTemplateStartEdit(title, text);
                    }} />
                  <FontAwesome className="templates-list-item-remove" name='times'
                    onClick={(e) => {
                      e.stopPropagation();
                      this.handleTemplateRemoved(id);
                    }} />
                </span>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

}

export default TemplatesPanel;
