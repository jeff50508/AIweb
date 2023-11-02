
import React from 'react'; 
import { Card } from 'primereact/card';
import { Button } from 'primereact/button';

export default function AdvancedDemo() {
    return (
        <div className="card flex justify-content-center gap-8 container ">
                <Card title="預測美股價格"  header={<button><i className="pi pi-chart-bar" style={{ fontSize: '4rem' }}></i></button>} className="md:w-25rem bg-color-1 text-white">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                        numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                    </p>
                </Card>
                <Card title="關鍵字生成照片"  header={<button><i className="pi pi-images" style={{ fontSize: '4rem' }}></i></button>} className="md:w-25rem bg-color-1 text-white">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                        numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                    </p>
                </Card>
                <Card title="AI歌手"  header={<button><i className="pi pi-volume-up" style={{ fontSize: '4rem' }}></i></button>} className="md:w-25rem bg-color-1 text-white">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                        numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                    </p>
                </Card>
                <Card title="人臉辨識"  header={<button><i className="pi pi-users" style={{ fontSize: '4rem' }}></i></button>} className="md:w-25rem bg-color-1 text-white">
                    <p className="m-0">
                        Lorem ipsum dolor sit amet, consectetur adipisicing elit. Inventore sed consequuntur error repudiandae 
                        numquam deserunt quisquam repellat libero asperiores earum nam nobis, culpa ratione quam perferendis esse, cupiditate neque quas!
                    </p>
                </Card>

        </div>
    )
}

        