export const flexbox = ({ dir = "row", jc = "center", ai = "center" } = {}) => `
      display: flex;
      flex-direction: ${dir};
      justify-content: ${jc};
      align-items: ${ai};
  `;

export const borderShadowsRadius = `
    border-radius: 10px;
    box-shadow: 10px 10px 20px 0 rgba(54, 73, 79, 0.25),
                -8px -8px 16px 0 rgba(242, 248, 250, 0.9);
    border: 1px solid rgba(242, 248, 250, 0.2);
  `;

export const buttonStyle = `
    ${flexbox()};
    width: 65%;
    height: 11%;
    border-radius: 5px;
    box-shadow: -3px -3px 6px 0 rgba(242, 248, 250, 1),
        3px 3px 6px 0 rgba(54, 73, 79, 0.25);
    border: none;
    font-size: 0.9rem;
    margin-bottom: 5px;
    text-shadow: 0 0 1px white;
    opacity: 0.5;
    transition: 0.3s ease-out;
  `;
