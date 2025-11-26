import React from 'react';

const Disclaimer = () => {
  return (
    <div className="bg-amber-50 border-l-4 border-amber-500 p-4 my-4 text-sm text-amber-800">
      <p className="font-bold">免责声明</p>
      <p>
        本工具提供的计算结果仅供参考。实际装载量可能会因包装不规则、托盘使用、填充物、法律重量限制及人工装箱效率而有所不同。请务必与您的承运商核实。
      </p>
    </div>
  );
};

export default Disclaimer;