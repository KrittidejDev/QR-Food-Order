import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  QrCode,
  Store,
  Users,
  ArrowRight,
  Sparkles,
  Globe,
} from "lucide-react";
import Link from "next/link";

export default function Home() {
  return (
    <div className="w-full min-h-screen bg-gradient-to-br from-pink-50 via-orange-50 to-blue-50 overflow-hidden">
      {/* Background Decorative Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 -left-20 w-72 h-72 bg-pink-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-blue-300 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse delay-700"></div>
      </div>

      {/* Hero Section */}
      <section className="relative z-10 flex flex-col items-center justify-center min-h-screen px-4 sm:px-6 lg:px-8 text-center">
        <Badge className="mb-4 px-4 py-1 text-xs font-medium bg-gradient-to-r from-pink-500 to-orange-500 text-white shadow-sm">
          <Sparkles className="w-3 h-3 mr-1" />
          ระบบจัดการร้านอาหารยุคใหม่
        </Badge>

        <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-gray-900 mb-6 leading-tight">
          <span className="bg-gradient-to-r from-pink-600 via-orange-600 to-blue-600 bg-clip-text text-transparent">
            QR Food Order
          </span>
        </h1>

        <p className="max-w-2xl mx-auto text-lg sm:text-xl text-gray-700 mb-8 leading-relaxed">
          สแกน QR สั่งอาหารทันที — รองรับ <strong>หลายร้านค้า</strong>{" "}
          ในระบบเดียว
          <br className="hidden sm:block" />
          จัดการเมนู ออเดอร์ และโต๊ะ ง่าย ๆ ผ่านแดชบอร์ดอัจฉริยะ
        </p>

        <div className="flex flex-col sm:flex-row gap-4 mb-12">
          <Link href="/dashboard">
            <Button
              size="lg"
              className="group relative overflow-hidden bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white font-semibold text-lg px-8 py-6 rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
            >
              <Store className="w-5 h-5 mr-2" />
              เริ่มจัดการร้านค้า
              <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
              <span className="absolute inset-0 bg-white opacity-0 group-hover:opacity-20 transition-opacity"></span>
            </Button>
          </Link>

          <Button
            size="lg"
            variant="outline"
            className="text-lg px-8 py-6 rounded-2xl border-2 border-gray-300 hover:border-orange-400 hover:bg-orange-50 transition-all duration-300"
          >
            <QrCode className="w-5 h-5 mr-2" />
            ดูตัวอย่าง QR
          </Button>
        </div>

        {/* QR Preview Card */}
        <Card className="relative p-8 bg-white/80 backdrop-blur-sm shadow-2xl rounded-3xl border border-white/50 max-w-sm mx-auto animate-fade-up">
          <div className="absolute -top-4 -right-4 w-24 h-24 bg-gradient-to-br from-pink-500 to-orange-500 rounded-full blur-2xl opacity-50"></div>
          <div className="relative z-10">
            <div className="w-40 h-40 mx-auto mb-4 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center shadow-inner">
              <QrCode className="w-24 h-24 text-gray-600" />
            </div>
            <p className="text-sm text-gray-600 font-medium">สแกนเพื่อดูเมนู</p>
          </div>
        </Card>
      </section>

      {/* Features Section */}
      <section className="relative z-10 py-20 px-4 sm:px-6 lg:px-8 bg-white/40 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl sm:text-4xl font-bold text-center text-gray-800 mb-12">
            ฟีเจอร์ที่ร้านคุณต้องการ
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: <Globe className="w-8 h-8" />,
                title: "Multi-Vendor",
                desc: "รองรับหลายร้านในระบบเดียว แยกข้อมูลชัดเจน",
                color: "from-blue-500 to-cyan-500",
              },
              {
                icon: <QrCode className="w-8 h-8" />,
                title: "QR Menu อัจฉริยะ",
                desc: "สร้าง QR Code สำหรับแต่ละโต๊ะ ลูกค้าสั่งได้ทันที",
                color: "from-pink-500 to-rose-500",
              },
              {
                icon: <Users className="w-8 h-8" />,
                title: "จัดการง่าย",
                desc: "แดชบอร์ดรวม ดูออเดอร์ เมนู และรายงานแบบเรียลไทม์",
                color: "from-orange-500 to-amber-500",
              },
            ].map((feature, i) => (
              <Card
                key={i}
                className="group p-6 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 border border-gray-100 hover:border-transparent hover:-translate-y-2"
              >
                <div
                  className={`w-14 h-14 rounded-xl bg-gradient-to-br ${feature.color} p-3 mb-4 text-white shadow-lg group-hover:scale-110 transition-transform`}
                >
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">{feature.desc}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Footer */}
      <section className="relative py-16 px-4 text-center">
        <p className="text-lg text-gray-700 mb-6">
          พร้อมเปลี่ยนร้านอาหารของคุณให้ทันสมัยหรือยัง?
        </p>
        <Link href="/dashboard">
          <Button
            size="lg"
            className="bg-gradient-to-r from-pink-600 to-orange-600 hover:from-pink-700 hover:to-orange-700 text-white font-bold text-lg px-10 py-6 rounded-full shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105"
          >
            เริ่มใช้งานฟรี
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </Link>
      </section>
    </div>
  );
}
