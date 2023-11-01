import {
  Decoration,
  DecorationSet,
  EditorView,
  MatchDecorator,
  ViewPlugin,
  ViewUpdate,
  WidgetType,
} from '@codemirror/view';
import styles from './index.module.scss';

let map: any = {};

class PlaceholderWidget extends WidgetType {
  private label: string;
  private placeholderClick?: (label: string, value: string, id: string) => void;
  constructor(
    label: string,
    placeholderClick?: (label: string, value: string, id: string) => void,
  ) {
    super();
    this.label = label;
    this.placeholderClick = placeholderClick;
  }

  eq(other: any) {
    return other.label === this.label;
  }

  toDOM() {
    const wrap = document.createElement('span');
    const value = map[this.label];
    wrap.innerHTML = value || this.label;
    wrap.className = value ? styles.widget : '';

    wrap.id = this.label;
    const uniqueId = Math.random().toString(36).substr(2, 9);
    wrap.setAttribute('data-unique-id', uniqueId);
    wrap.setAttribute('data-label', this.label);

    wrap.onclick = () => {
      this.placeholderClick?.(this.label, value, uniqueId);
    };

    return wrap;
  }
}

const placeholderMatcher = (
  placeholderClick?: (label: string, value: string, id: string) => void,
) =>
  new MatchDecorator({
    regexp: /\[((\w|-|@|#)+)]/g,
    decoration: (match) =>
      Decoration.replace({
        widget: new PlaceholderWidget(match[1], placeholderClick),
      }),
  });

export const saveMap = (m: any) => {
  map = m;
};

export const placeholders = (
  data: any,
  placeholderClick?: (label: string, value: string, id: string) => void,
) =>
  ViewPlugin.fromClass(
    class {
      placeholders: DecorationSet;
      constructor(view: EditorView) {
        this.placeholders =
          placeholderMatcher(placeholderClick).createDeco(view);
        map = data;
      }
      update(update: ViewUpdate) {
        this.placeholders = placeholderMatcher(placeholderClick).updateDeco(
          update,
          this.placeholders,
        );
      }
    },
    {
      decorations: (instance) => instance.placeholders,
      provide: (plugin) =>
        EditorView.atomicRanges.of((view) => {
          return view.plugin(plugin)?.placeholders || Decoration.none;
        }),
    },
  );
