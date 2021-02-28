const LDS_RING = 'lds-ring';
// const template = `
//   <div class="lds-ring">
//     <div></div>
//     <div></div>
//     <div></div>
//     <div></div>
//   </div>
// `;

export default () => {
  const loader = document.createElement('div');
  loader.className = LDS_RING;
  loader.innerHTML = `
    <div></div>
    <div></div>
    <div></div>
    <div></div>
  `;
  return loader;
};
