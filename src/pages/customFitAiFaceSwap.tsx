import React, { useState } from 'react';
import { Upload, Camera, ShoppingCart, Check, X, ChevronDown, ChevronUp } from 'lucide-react';

// 定義商品介面
interface Product {
  id: number;
  name: string;
  category: string;
  spec: string;
  price: number;
  selected: boolean;
}

// 模擬數據
const mockProducts: Product[] = [
  { id: 1, name: "春季細肩帶洋裝", category: "上衣", spec: "白色/M號", price: 1580, selected: false },
  { id: 2, name: "高腰寬鬆牛仔褲", category: "下裝", spec: "淺藍/S號", price: 1280, selected: false },
  { id: 3, name: "編織手提包", category: "包包", spec: "米色/單一尺寸", price: 2480, selected: false },
  { id: 4, name: "蝴蝶結髮夾", category: "飾品", spec: "粉色/單一尺寸", price: 580, selected: false },
  { id: 5, name: "貝殼造型耳環", category: "飾品", spec: "金色/單一尺寸", price: 780, selected: false }
];

const FaceSwapMarketingTool: React.FC = () => {
  const [customerPhoto, setCustomerPhoto] = useState<string | null>(null);
  const [outfitPhoto, setOutfitPhoto] = useState<string | null>(null);
  const [resultPhoto, setResultPhoto] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>(mockProducts);

  // 客戶照片上傳處理
  const handleCustomerPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 實際應用中處理檔案上傳
    setCustomerPhoto("/api/placeholder/150/200");
  };

  // 配裝照上傳處理
  const handleOutfitPhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    // 實際應用中處理檔案上傳
    setOutfitPhoto("/api/placeholder/250/400");
  };

  // 模擬換臉處理
  const handleFaceSwap = () => {
    if (!customerPhoto || !outfitPhoto) return;
    
    setIsProcessing(true);
    // 模擬API調用延遲
    setTimeout(() => {
      setIsProcessing(false);
      setResultPhoto("/api/placeholder/400/600");
    }, 1500);
  };

  // 重設所有照片
  const resetPhotos = () => {
    setCustomerPhoto(null);
    setOutfitPhoto(null);
    setResultPhoto(null);
  };

  // 切換商品選擇狀態
  const toggleProductSelection = (productId: number) => {
    setProducts(products.map(product => 
      product.id === productId 
        ? { ...product, selected: !product.selected } 
        : product
    ));
  };

  // 計算所選商品總價
  const totalPrice = products
    .filter(p => p.selected)
    .reduce((sum, product) => sum + product.price, 0);

  // 安全地獲取 DOM 元素
  const getElementById = (id: string): HTMLElement | null => {
    return document.getElementById(id);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* 頂部導航 */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-semibold text-pink-600">客製化行銷工具</h1>
          <div className="flex items-center space-x-4">
            <button className="text-gray-600 hover:text-gray-800">
              <Camera size={20} />
            </button>
            <button className="text-gray-600 hover:text-gray-800 relative">
              <ShoppingCart size={20} />
              {totalPrice > 0 && (
                <span className="absolute -top-2 -right-2 bg-pink-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center">
                  {products.filter(p => p.selected).length}
                </span>
              )}
            </button>
          </div>
        </div>
      </header>

      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row h-[calc(100vh-12rem)] space-y-4 md:space-y-0 md:space-x-4">
            {/* 左側區域 (30%) - 照片上傳區 */}
            <div className="md:w-[20%] bg-white rounded-lg shadow-md p-4 flex flex-col">
              <h2 className="text-lg font-medium text-gray-800 mb-4">照片上傳</h2>
              
              {/* 客戶照片上傳 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  VIP客戶照片
                </label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-pink-400 transition-colors"
                  onClick={() => {
                    const element = getElementById('customerPhotoInput');
                    if (element) element.click();
                  }}
                >
                  {customerPhoto ? (
                    <div className="relative">
                      <img src={customerPhoto} alt="客戶照片" className="h-32 object-cover rounded" />
                      <button 
                        className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setCustomerPhoto(null);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">上傳客戶照片</p>
                      <p className="text-xs text-gray-400 mt-1">建議正面清晰照</p>
                    </>
                  )}
                  <input 
                    id="customerPhotoInput" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleCustomerPhotoUpload} 
                  />
                </div>
              </div>
              
              {/* 配裝照上傳 */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  服裝配搭照片
                </label>
                <div 
                  className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center cursor-pointer hover:border-pink-400 transition-colors"
                  onClick={() => {
                    const element = getElementById('outfitPhotoInput');
                    if (element) element.click();
                  }}
                >
                  {outfitPhoto ? (
                    <div className="relative">
                      <img src={outfitPhoto} alt="配裝照片" className="h-48 object-cover rounded" />
                      <button 
                        className="absolute -top-2 -right-2 bg-gray-200 rounded-full p-1 hover:bg-gray-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          setOutfitPhoto(null);
                        }}
                      >
                        <X size={14} />
                      </button>
                    </div>
                  ) : (
                    <>
                      <Upload className="w-10 h-10 text-gray-400 mb-2" />
                      <p className="text-sm text-gray-500">上傳服裝照片</p>
                      <p className="text-xs text-gray-400 mt-1">需含人物模特兒</p>
                    </>
                  )}
                  <input 
                    id="outfitPhotoInput" 
                    type="file" 
                    className="hidden" 
                    accept="image/*" 
                    onChange={handleOutfitPhotoUpload}
                  />
                </div>
              </div>
              
              {/* 換臉操作按鈕 */}
              <div className="mt-auto space-y-2">
                <button 
                  className="w-full bg-pink-600 text-white py-3 rounded-md font-medium hover:bg-pink-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={!customerPhoto || !outfitPhoto || isProcessing}
                  onClick={handleFaceSwap}
                >
                  {isProcessing ? (
                    <>
                      <span className="animate-spin mr-2">⏳</span>
                      處理中...
                    </>
                  ) : '產生客製化穿搭照'}
                </button>
                
                <button 
                  className="w-full bg-gray-200 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors flex items-center justify-center"
                  onClick={resetPhotos}
                >
                  <X size={16} className="mr-2" />
                  重新設置
                </button>
              </div>
              
              {/* 使用提示 */}
              <div className="mt-4 p-3 bg-pink-50 rounded-md">
                <h3 className="text-xs font-medium text-pink-800 mb-1">使用提示</h3>
                <p className="text-xs text-pink-600">
                  先上傳客戶照片，再上傳服裝照片，點擊「產生」按鈕開始處理。
                </p>
              </div>
            </div>
            
            {/* 中間區域 (50%) - 結果圖區域 */}
            <div className="md:w-[60%] bg-white rounded-lg shadow-md p-4 flex flex-col">
              <h2 className="text-lg font-medium text-gray-800 mb-4">配裝結果</h2>
              
              <div className="flex-grow flex items-center justify-center bg-gray-50 rounded-md min-h-[400px]">
                {resultPhoto ? (
                  <div className="relative w-full h-full flex items-center justify-center">
                    <img src={resultPhoto} alt="換臉結果" className="max-h-[calc(100vh-20rem)] rounded-md" />
                    
                    {/* 結果照上的商品標籤 - 這裡只是視覺示例，實際應根據API結果動態生成 */}
                    <div className="absolute top-1/4 left-1/4 bg-white bg-opacity-80 rounded px-2 py-1 shadow-sm">
                      <p className="text-xs font-medium text-gray-800">春季細肩帶洋裝</p>
                      <p className="text-xs text-pink-600">NT$ 1,580</p>
                    </div>
                    
                    <div className="absolute top-2/3 left-1/5 bg-white bg-opacity-80 rounded px-2 py-1 shadow-sm">
                      <p className="text-xs font-medium text-gray-800">高腰寬鬆牛仔褲</p>
                      <p className="text-xs text-pink-600">NT$ 1,280</p>
                    </div>
                    
                    <div className="absolute top-1/3 right-1/4 bg-white bg-opacity-80 rounded px-2 py-1 shadow-sm">
                      <p className="text-xs font-medium text-gray-800">編織手提包</p>
                      <p className="text-xs text-pink-600">NT$ 2,480</p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center text-gray-400 w-full">
                    <Camera size={48} className="mx-auto mb-2 opacity-25" />
                    <p>上傳照片並點擊「產生」按鈕<br />生成客製化穿搭效果圖</p>
                  </div>
                )}
              </div>
              
              {resultPhoto && (
                <div className="mt-4 flex space-x-2">
                  <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors flex items-center justify-center">
                    <Camera size={16} className="mr-2" />
                    儲存圖片
                  </button>
                  <button className="flex-1 bg-gray-200 text-gray-700 py-2 rounded-md text-sm font-medium hover:bg-gray-300 transition-colors flex items-center justify-center">
                    分享給客戶
                  </button>
                </div>
              )}
            </div>
            
            {/* 右側區域 (20%) - 商品列表 */}
            <div className="md:w-[20%] bg-white rounded-lg shadow-md p-4 flex flex-col">
              <h2 className="text-lg font-medium text-gray-800 mb-4">商品列表</h2>
              
              <div className="flex-grow overflow-y-auto">
                {products.map(product => (
                  <div 
                    key={product.id} 
                    className="py-3 border-b last:border-b-0"
                  >
                    <div className="flex items-start mb-1">
                      <button 
                        className={`mt-1 flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center mr-2 ${product.selected ? 'bg-pink-500 border-pink-500' : 'border-gray-300'}`}
                        onClick={() => toggleProductSelection(product.id)}
                      >
                        {product.selected && <Check size={12} className="text-white" />}
                      </button>
                      <div>
                        <p className="text-sm font-medium text-gray-800">{product.name}</p>
                        <p className="text-xs text-gray-500 mt-0.5">{product.spec}</p>
                        <p className="text-sm font-semibold text-pink-600 mt-1">NT$ {product.price.toLocaleString()}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              
              {/* 購物車區域 - 固定在底部 */}
              <div className="mt-4 pt-4 border-t">
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">已選商品</span>
                  <span className="text-sm font-medium">{products.filter(p => p.selected).length} 件</span>
                </div>
                <div className="flex justify-between mb-4">
                  <span className="text-sm text-gray-600">總計金額</span>
                  <span className="text-base font-semibold text-pink-600">NT$ {totalPrice.toLocaleString()}</span>
                </div>
                
                <button 
                  className="w-full bg-pink-600 text-white py-3 rounded-md font-medium hover:bg-pink-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed flex items-center justify-center"
                  disabled={totalPrice === 0}
                >
                  <ShoppingCart size={18} className="mr-2" />
                  加入購物車
                </button>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <footer className="bg-white border-t py-4">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500 text-sm">
          © 2025 客製化行銷工具 - 打造個人專屬時尚體驗
        </div>
      </footer>
    </div>
  );
};

export default FaceSwapMarketingTool;