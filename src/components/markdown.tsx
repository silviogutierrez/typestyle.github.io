import * as React from "react";
import * as marked from "marked";
import { style, cssRaw, classes } from 'typestyle';
import * as csx from 'typestyle/csx';
import { colors } from './styles';

/**
 * CSS customizations
 */
namespace MarkDownStyles {
  export const rootClass = 'typestyle-markdown';

  cssRaw(`
.${rootClass} {
    color: ${colors.text}
}

.${rootClass} p {
  margin: 0px;
  line-height: 24px;
}

.${rootClass} h2 {
  margin: 0px;
}
.${rootClass} h3 {
  margin: 0px;
}

/** List styling */
.${rootClass} ul {
    margin: 0px;
}
.${rootClass} ul>* {
  margin-bottom: 10px !important;
}
.${rootClass} ul>*:last-child {
  margin-bottom: 0px !important;
}

.${rootClass} a {
    color: grey;
}

.${rootClass} a:hover {
    color: white;
}


.${rootClass} code {
    padding-left: 5px;
    padding-right: 5px;
    background: #eee;
}
  `);
}



interface Props { markdown: string }

/**
 * Renders markdown
 */
export class MarkDown extends React.PureComponent<Props, {}> {
  constructor(props: Props) {
    super(props);
  }

  render() {
    const rendered = toHtml(this.props.markdown);

    return (
      <div className={classes(MarkDownStyles.rootClass, style(csx.verticallySpaced(10)))} dangerouslySetInnerHTML={{ __html: rendered }} />
    );
  }
}

/** Converts an html string to markdown */
export function toHtml(markdown: string) {
  return (
    marked(markdown, { gfm: true })
      // Move hrefs to target blank
      .replace(/a href=/g, "a target='_blank' href=")
      // don't want a trailing newline
      .trim()
  );
}