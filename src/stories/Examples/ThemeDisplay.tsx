import React, { ReactNode } from "react";
import styled from "styled-components";

import { IStakenetTheme, stakenetTheme } from "../../shell/theme/stakenetTheme";
import { getFlexBetween } from "../../common/styles";

interface Props {
  className?: string;
}

const ThemeDisplay = ({
  colors,
  heading,
  paragraph,
  fontWeight,
  borderRadius,
  maxWidth,
  className,
}: IStakenetTheme & Props) => {
  /**
   * Returns the all the colors and nested subColors in an array
   * @return {Array<string, string>} colorPalette
   */
  const getColorsPalette = (): { name: string; color: string }[] => {
    const colorPalette: { name: string; color: string }[] = [];

    Object.keys(colors).map((colorProperty) => {
      // @ts-ignore
      if (typeof colors[colorProperty] === "object") {
        // @ts-ignore
        Object.keys(colors[colorProperty]).forEach((nestedColor) => {
          colorPalette.push({
            name: `${colorProperty} - ${nestedColor}`,
            // @ts-ignore
            color: colors[colorProperty][nestedColor],
          });
        });
      } else {
        colorPalette.push({
          name: colorProperty,
          // @ts-ignore
          color: colors[colorProperty],
        });
      }
    });
    return colorPalette;
  };

  /**
   * Render the typography values from the StakenetTheme in the UI
   * @param values - the type object values (values from heading | paragraph)
   * @param title - the name of the target to render (heading | paragraph)
   */
  const renderTypography = (
    values: { [key: string]: string },
    title: string
  ): ReactNode => {
    return Object.entries(values).map((entry) => (
      <div key={entry[0]} style={{ fontSize: entry[1] }}>
        {title} {entry[0]}
      </div>
    ));
  };

  /**
   * Render the font weight values from the StakenetTheme in the UI
   */
  const renderFontWeight = (): ReactNode => {
    return Object.entries(fontWeight)
      .reverse()
      .map((entry) => (
        <div
          key={entry[0]}
          style={{ fontWeight: entry[1], fontSize: paragraph.xl }}
        >
          {entry[0]}
        </div>
      ));
  };

  /**
   * Render the max width values from the StakenetTheme in the UI
   */
  const renderMaxWidth = (): ReactNode => {
    return Object.entries(maxWidth)
      .reverse()
      .map((entry: [string, string]) => (
        <div
          key={entry[0]}
          className="colors-rect"
          style={{ maxWidth: entry[1] }}
        >
          <div className="colors-rect__item">
            {entry[0]} - {entry[1]}
          </div>
        </div>
      ));
  };
  return (
    <div className={className}>
      <div className="theme-display">
        <div className="theme-display__title">Colors palette</div>
        <div className="colors-cards">
          {getColorsPalette().map((item: { color: string; name: string }) => (
            <div className="colors-cards__item" key={item.color}>
              <div
                style={{ backgroundColor: item.color, borderRadius: "5px" }}
                className="colors-cards__color"
              />
              <pre className="colors-cards__name">{item.name}</pre>
            </div>
          ))}
        </div>

        <hr className="theme-display__next-section" />

        <div className="theme-display__title">Typography</div>
        <div className="typography-content">
          {renderTypography(heading, "heading")}
        </div>

        <div className="typography-content">
          {renderTypography(paragraph, "paragraph")}

          <hr className="theme-display__next-section" />

          <div className="theme-display__title">Font weight</div>
          <div className="typography-content">{renderFontWeight()}</div>
        </div>

        <hr className="theme-display__next-section" />

        <div className="theme-display__title">Border radius</div>
        <div className="colors-cards">
          {Object.entries(borderRadius)
            .reverse()
            .map((item: [string, string]) => (
              <div className="colors-cards__item" key={item[1]}>
                <div
                  style={{
                    borderRadius: item[1],
                    backgroundColor: colors.blue.lighter,
                  }}
                  className="colors-cards__color"
                />
                <pre className="colors-cards__name">{item[0]}</pre>
              </div>
            ))}
        </div>

        <hr className="theme-display__next-section" />

        <div className="theme-display__title">Max width</div>
        {renderMaxWidth()}
      </div>
    </div>
  );
};

/**
 * Wrap (HOC) our React component with styled-component to allow us target classes directly
 * @param Component - the target React Functional component
 * @param theme - the app theme
 */
function withStyles<T>(
  Component: React.ComponentType<T>,
  theme: IStakenetTheme
) {
  const StyledThemeDisplay = styled(Component)`
    .theme-display {
      &__title {
        color: ${theme.colors.blue.lightest};
        font-size: ${theme.heading.xl};
        margin-bottom: ${theme.margin.md};
      }

      &__next-section {
        margin: ${theme.margin.lg} 0;
      }
    }

    .colors-cards {
      ${getFlexBetween};
      flex-wrap: wrap;

      &__item {
        width: 16rem;
        padding: 1.5rem;
        margin: 0.8rem;
        background-color: white;
      }

      &__color {
        height: 10rem;
        border-radius: 5px;
      }

      &__name {
        font-size: 12px;
        margin-bottom: 0;
        text-align: center;
      }
    }

    .typography-content {
      color: white;
      margin-bottom: 2rem;
    }

    .colors-rect {
      display: flex;
      flex-direction: column;
      height: 4rem;
      width: 100%;
      background-color: ${theme.colors.blue.light};
      margin-bottom: ${theme.margin.md};

      &__item {
        color: white;
        margin: auto 0;
        padding-left: 1rem;
        font-size: ${theme.paragraph.lg};
      }
    }
  `;

  // @ts-ignore
  const result: React.FC<T> = (props) => <StyledThemeDisplay {...props} />;
  return result;
}

const StyledThemeDisplay = withStyles(ThemeDisplay, stakenetTheme);
export default StyledThemeDisplay;
