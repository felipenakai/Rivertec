 const $ = i => document.getElementById(i);
        const NM = ['Visão geral', '1 Sensor de deflexão', '2 Acelerômetro', '3 Nó sensor', '4 Fixação', '5 Rádio', '6 Painel', '7 Posto e nuvem', '8 Sensor de temperatura', 'Suspensão ampliada'];
        const INFO = [
            ['Visão geral', ['Sensores no chassi e no eixo, nó na longarina, rádio até a cabine e nuvem no posto de parada.', 'Nada é instalado sobre as lâminas do feixe de molas. Escolha uma parte pelos botões.', 'Posições de instalação são soluções preliminares, a validar por ensaios.']],
            ['Sensor de deflexão', ['Hall rotativo Honeywell RTY (confirmado), com proteção IP69K, no suporte aparafusado à longarina. Fora das lâminas.', 'Alavanca articulada e bieleta ligam o sensor a um grampo na carcaça do eixo. Assim ele lê o movimento vertical entre chassi e eixo sem limitar o curso.', 'Capa protege contra pedras, lama, água e impactos.', 'Ponto de ligação no eixo: preliminar, a validar.']],
            ['Acelerômetro de eixo', ['Analog Devices ADXL372 (confirmado), faixa de até ±200 g.', 'Preso por abraçadeira e suporte rígidos na carcaça do eixo, separado do sensor Hall e das lâminas.', 'Capa de proteção contra impacto, água e lama.', 'Posição exata no eixo: preliminar, a validar. A placa dos grampos não é o ponto definitivo.']],
            ['Nó sensor', ['Caixa metálica independente na lateral interna da longarina, em região alta e abrigada sob a carroceria, longe do eixo e das molas.', 'Dentro: microcontrolador, condicionamento dos sensores, rádio 915 MHz, memória, gestão de energia e bateria.', 'Vedação projetada para IP67/IP69K (a validar em ensaio), tampa removível, respiro com membrana, conectores selados e placa de proteção contra pedras.', 'Antena fora da caixa, na face externa da longarina. Use o controle para abrir a caixa (vista explodida à frente).']],
            ['Suportes e fixações', ['Nó e sensor Hall: suportes metálicos aparafusados à longarina.', 'Acelerômetro: abraçadeira rígida na carcaça do eixo. Termistor: suporte na longarina, com haste até perto do feixe.', 'Sem solda e sem furos novos no caminhão: furos e fixação definitiva dependem de validação do fabricante.', 'Grampos amarelos: originais da mola, sem modificação.']],
            ['Rádio local 915 MHz', ['Antena externa ligada ao nó leva os avisos ao painel da cabine, sem internet e sem celular.', 'Pacotes pequenos. Se o sinal cair, o nó guarda e reenvia depois.', 'Pareado e criptografado. Regras da Anatel (Res. 680/2017).']],
            ['Painel na cabine', ['Mostra dano acumulado e a condição da mola esquerda e da direita, com cor e frase direta.', 'Traz indicadores dos sensores, alertas de funcionamento e recomendações de manutenção.', 'Guarda o histórico e usa GPS. Sem dados do nó, nunca mostra “tudo certo”.']],
            ['Posto de mola e nuvem', ['Ao parar com Wi-Fi, o painel envia o histórico pendente à plataforma online.', 'A nuvem guarda o histórico e gera a recomendação. O gestor vê o desgaste por veículo.', 'Sem internet, o monitoramento local continua normalmente.']],
            ['Sensor de temperatura', ['Termistor NTC em sonda separada do nó, presa a um suporte na longarina.', 'A ponta fica perto do feixe, sem tocar as lâminas, para uma temperatura representativa da suspensão. O cabo vai até o nó.', 'Modelo e posição: candidatos a validar.']],
            ['Suspensão ampliada', ['Vista de conjunto: sensor Hall com alavanca, acelerômetro no eixo, termistor, nó na longarina, suportes e cabos.', 'Cabos com bainha e presos à longarina, afastados das partes móveis: azul (Hall), laranja (acelerômetro), vermelho (temperatura).', 'Longarina em transparência para mostrar o nó na face interna.']]];
        const PS = [[2, 2, 0, 17, .8, .35], [2.85, 1.05, .6, 6, .6, .3], [3.6, .6, .3, 5.5, .6, .2], [1.5, 2.2, 1.5, 11, .5, .25], [2.4, 1, .6, 8, .6, .3], [-1.2, 2.4, 1, 13, .1, .2], [-3.7, 3.8, 0, 9, .4, .2], [8, 2.4, 0, 10, .6, .25], [3.9, .85, .6, 5, .8, .3], [2.7, 1, .5, 7.5, .75, .3]];
        let go3 = null;
        function view(k) {
            $('it').textContent = INFO[k][0]; $('il').innerHTML = INFO[k][1].map(t => '<li>' + t + '</li>').join('');
            document.querySelectorAll('#chips button').forEach((b, i) => b.setAttribute('aria-pressed', i === k));
            $('exl').hidden = k !== 3; if (go3) go3(k);
        }
        $('chips').innerHTML = NM.map((n, i) => '<button>' + n + '</button>').join('');
        document.querySelectorAll('#chips button').forEach((b, i) => b.onclick = () => view(i));
        try {
            const W = () => $('c3').clientWidth || 600, H = () => $('c3').clientHeight || 400;
            const rn = new THREE.WebGLRenderer({antialias: true, alpha: true}); rn.setPixelRatio(Math.min(devicePixelRatio, 2)); rn.shadowMap.enabled = true; rn.setSize(W(), H(), false); $('c3').appendChild(rn.domElement);
            const sn = new THREE.Scene(), cam = new THREE.PerspectiveCamera(40, W() / H(), .1, 200);
            sn.add(new THREE.HemisphereLight(0xffffff, 0x8a9499, .9)); const dl = new THREE.DirectionalLight(0xffffff, .75); dl.position.set(6, 12, 8); dl.castShadow = true; dl.shadow.mapSize.set(1024, 1024); const sh2 = dl.shadow.camera; sh2.left = -14; sh2.right = 14; sh2.top = 9; sh2.bottom = -9; sh2.near = 1; sh2.far = 45; sn.add(dl);
            const L = (c, o) => new THREE.MeshStandardMaterial(o ? {color: c, roughness: .6, metalness: .1, transparent: true, opacity: o, depthWrite: false} : {color: c, roughness: .6, metalness: .1}), B = c => new THREE.MeshBasicMaterial({color: c});
            const G = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(() => {const g = new THREE.Group(); sn.add(g); return g;});
            const box = (w, h, d, m, x, y, z, g) => {const e = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m); e.castShadow = true; e.position.set(x, y, z); g.add(e); return e;};
            const cyl = (r, h, m, x, y, z, g, rx) => {const e = new THREE.Mesh(new THREE.CylinderGeometry(r, r, h, 16), m); e.position.set(x, y, z); if (rx) e.rotation.x = Math.PI / 2; g.add(e); return e;};
            const ball = (r, m, x, y, z, g) => {const e = new THREE.Mesh(new THREE.SphereGeometry(r, 12, 10), m); e.position.set(x, y, z); g.add(e); return e;};
            const gr = new THREE.Mesh(new THREE.PlaneGeometry(60, 18), L(0x8a9499, .35)); gr.rotation.x = -Math.PI / 2; G[0].add(gr); const shp = new THREE.Mesh(new THREE.PlaneGeometry(60, 18), new THREE.ShadowMaterial({opacity: .28})); shp.rotation.x = -Math.PI / 2; shp.position.y = .01; shp.receiveShadow = true; G[0].add(shp);
            const rl = L(0x5B666C, .4);[.85, -.85].forEach(z => box(9.2, .24, .14, z > 0 ? rl : L(0x5B666C), .4, 1.12, z, G[0])); box(7.4, 2, 2.1, L(0xB8C2C7), 1.2, 2.28, 0, G[0]); box(2, 1.8, 2, L(0x2F6690), -3.7, 2.18, 0, G[0]); box(.05, .7, 1.6, L(0x14202A), -4.72, 2.5, 0, G[0]);
            const mW = L(0x1B2226, .55), wl = [], mSp = L(0x8F9BA1);
            [-3.7, 3.3].forEach(x => {cyl(.08, 2.4, L(0x7C878D), x, .6, 0, G[0], 1);[-1.2, 1.2].forEach(z => wl.push(cyl(.6, .35, mW, x, .6, z, G[0], 1)));});
            [.85, -.85].forEach(z => [[1.9, .9], [1.5, .84], [1.1, .78]].forEach(([l, y]) => {const c = new THREE.QuadraticBezierCurve3(new THREE.Vector3(-l / 2, y - .08, 0), new THREE.Vector3(0, y + .08, 0), new THREE.Vector3(l / 2, y - .08, 0)); const t = new THREE.Mesh(new THREE.TubeGeometry(c, 16, .035, 6, false), mSp); t.scale.z = 4; t.position.set(3.3, 0, z); t.castShadow = true; G[0].add(t);}));
            const mA = L(0xF5B93C), mAb = L(0xC98F1A), bl = L(0x7A878E), st = L(0x8F9BA1), bk = L(0x1B2226);
            cyl(.15, 2.1, st, 3.3, .6, 0, G[0], 1);
            const df = new THREE.Mesh(new THREE.SphereGeometry(.4, 16, 12), st); df.position.set(3.3, .6, 0); df.scale.set(1.1, .95, .9); df.castShadow = true; G[0].add(df);
            [1, -1].forEach(s => {
                cyl(.26, .25, L(0xC9D1D5), 3.3, .6, s * 1.0, G[0], 1);
                [2.35, 4.25].forEach(x => cyl(.085, .5, bk, x, .82, s * .85, G[0], 1));
                box(.3, .42, .5, bl, 2.35, .97, s * .85, G[0]); box(.26, .3, .5, bl, 4.25, .63, s * .85, G[0]);

                if (s < 0) {box(.7, .06, .5, st, 3.3, .985, -.85, G[0]); box(.7, .06, .5, st, 3.3, .47, -.85, G[0]);[-.28, .28].forEach(dx => [-.65, -1.05].forEach(z => box(.05, .58, .05, bk, 3.3 + dx, .73, z, G[0])));}
            });
            box(.34, .2, 1.9, bl, 2.35, .9, 0, G[0]); box(.5, .06, 1.9, bl, 2.35, 1.14, 0, G[0]); box(.24, .26, 1.9, bl, 4.2, .64, 0, G[0]);
            box(.6, .3, .5, bl, 3.3, 1.0, 0, G[0]); box(.9, .06, .5, bl, 3.3, 1.16, 0, G[0]);
            const dk = L(0x20282C), yl = B(0xFFF3B0), rd2 = B(0xE24B4A);
            box(.06, .45, 1.2, dk, -4.74, 1.7, 0, G[0]);[.75, -.75].forEach(z => {box(.06, .2, .3, yl, -4.74, 1.75, z, G[0]); box(.04, .2, .25, rd2, 4.92, 1.5, z, G[0]); box(.9, .6, .04, dk, -3.9, 2.55, z * 1.35, G[0]); box(.1, .4, .06, dk, -4.55, 2.6, z * 1.55, G[0]);});
            box(.35, .2, 2.1, L(0x3B454B), -4.85, 1.45, 0, G[0]); box(.2, .15, 1.9, L(0x3B454B), 5, 1.1, 0, G[0]);
            wl.forEach(w => {const r = new THREE.Mesh(new THREE.CylinderGeometry(.32, .32, .37, 16), L(0xC9D1D5)); w.add(r);});
            const rw = wl[3]; rw.material = L(0x1B2226, .2); rw.children[0].material = L(0xC9D1D5, .25);
            const mBl = L(0x2D8CFF), mO = L(0xF28A4E), mT = L(0x4FB0A8), mN = L(0x1B7F79), mR = B(0x7F77DD);
            const gy = L(0x6F7B81), gl = L(0x9AA5AB, .32), nx = 1.5, ny = 1.0, nz = .5;
            box(.3, .3, .24, mBl, 2.85, 1.05, .6, G[1]); box(.5, .05, .03, mBl, 3.07, 1.05, .5, G[1]); box(.03, .28, .03, mBl, 3.3, .91, .5, G[1]);
            [[2.85, 1.05], [3.3, 1.05], [3.3, .78]].forEach(([x, y]) => ball(.045, mBl, x, y, .5, G[1])); box(.8, .04, .36, gl, 3.1, 1.22, .6, G[1]);
            box(.18, .12, .18, mO, 3.78, .6, .3, G[2]); box(.5, .4, .3, gl, 3.62, .6, .3, G[2]);
            box(.6, .36, .5, mN, nx, ny, nz, G[3]); box(.62, .04, .52, L(0x24A39A), nx, ny + .2, nz, G[3]); box(.7, .03, .56, gl, nx, .74, nz, G[3]); cyl(.04, .04, L(0xDDE3E6), nx, .8, nz, G[3]);
            [-.14, 0, .14].forEach(d => {const e = cyl(.05, .1, L(0x44525A), 1.84, .98, nz + d, G[3]); e.rotation.set(0, 0, Math.PI / 2);});
            {const e = cyl(.05, .1, L(0x44525A), 1.17, .98, nz, G[3]); e.rotation.set(0, 0, Math.PI / 2); const w = cyl(.035, .6, bk, .8, 1.08, .99, G[3]); w.rotation.set(0, 0, Math.PI / 2); ball(.06, L(0x44525A), 1.1, 1.08, .99, G[3]);}
            box(.7, .06, .5, mA, 3.3, .985, .85, G[4]); box(.7, .06, .5, mA, 3.3, .47, .85, G[4]);
            [[-.28, .65], [.28, .65], [-.28, 1.05], [.28, 1.05]].forEach(([dx, z]) => box(.05, .58, .05, mAb, 3.3 + dx, .73, z, G[4]));
            box(.7, .4, .03, mT, nx, 1.0, .765, G[4]); box(.7, .03, .5, mT, nx, .8, nz, G[4]); box(.5, .22, .03, mT, 2.85, 1.11, .765, G[4]); box(.2, .22, .03, mT, 3.9, 1.11, .765, G[4]); box(.2, .16, .04, mT, 1.1, 1.1, .94, G[4]);
            [[nx - .28, 1.1], [nx + .28, 1.1], [2.7, 1.11], [3, 1.11], [3.9, 1.11], [1.1, 1.1]].forEach(([x, y]) => box(.06, .06, .05, bk, x, y, .8, G[4]));
            cyl(.17, .1, gy, 3.3, .6, .3, G[4], 1); box(.3, .26, .3, gy, 3.6, .6, .3, G[4]); box(.2, .1, .2, gy, 3.3, .79, .5, G[4]);
            const cab = (p, c) => {const t = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(p.map(q => new THREE.Vector3(...q))), 24, .022, 6, false), L(c)); G[9].add(t);};
            cab([[2.7, 1.05, .56], [2.5, 1.07, .56], [2.1, 1.07, .56], [1.92, 1.0, .64], [1.84, .98, .64]], 0x2D8CFF);
            cab([[3.78, .6, .3], [3.95, .78, .38], [3.95, 1.02, .44], [3.7, 1.07, .44], [2.3, 1.07, .44], [2, 1.03, .5], [1.84, .98, .5]], 0xF28A4E);
            cab([[3.9, .83, .46], [4.05, .9, .44], [4, 1.04, .37], [3.7, 1.1, .36], [2.3, 1.1, .36], [2, 1.04, .36], [1.84, .98, .36]], 0xE24B4A);
            cab([[1.18, .98, .5], [1.05, .95, .7], [1, .95, .95], [1.1, 1.06, .99]], 0x1B2226);
            const arc = new THREE.QuadraticBezierCurve3(new THREE.Vector3(.5, 1.08, .99), new THREE.Vector3(-1.2, 3.8, 2), new THREE.Vector3(-3, 2.9, 1.1)), mid = arc.getPoint(.5);
            for (let i = 0; i <= 12; i++) {if (i === 6) continue; const q = arc.getPoint(i / 12); ball(.075, mR, q.x, q.y, q.z, G[5]);}
            ball(.13, mR, .5, 1.08, .99, G[5]); box(.3, .2, .3, L(0x6A5FC9), -3, 2.9, 1.1, G[5]);
            const pc = document.createElement('canvas'); pc.width = 512; pc.height = 300; const p = pc.getContext('2d');
            p.fillStyle = '#0E1316'; p.fillRect(0, 0, 512, 300); p.fillStyle = '#9DAAB1'; p.font = '20px Arial'; p.fillText('Painel do motorista', 20, 34);
            [['Mola esquerda', 'Atenção', '#F5B93C', '62%'], ['Mola direita', 'Boa', '#5BD16C', '28%']].forEach((r, i) => {const y = 100 + i * 70; p.fillStyle = r[2]; p.beginPath(); p.arc(40, y - 8, 14, 0, 6.3); p.fill(); p.fillStyle = '#9DAAB1'; p.font = '20px Arial'; p.fillText(r[0], 66, y - 2); p.fillStyle = r[2]; p.font = 'bold 36px Arial'; p.fillText(r[1], 250, y + 6); p.fillStyle = '#E8EDEF'; p.textAlign = 'right'; p.fillText(r[3], 492, y + 6); p.textAlign = 'left';});
            p.fillStyle = '#F5B93C'; p.font = 'bold 24px Arial'; p.fillText('Marque a revisão da mola esquerda.', 20, 262);
            const ps = new THREE.Sprite(new THREE.SpriteMaterial({map: new THREE.CanvasTexture(pc)})); ps.position.set(-3.7, 4.6, 0); ps.scale.set(2.4, 1.4, 1); G[6].add(ps);
            box(.05, .9, .05, mR, -3.7, 3.55, 0, G[6]);
            box(2.2, 1.4, 1.8, L(0xA9B3B8), 9, .7, 0, G[7]); const rf = new THREE.Mesh(new THREE.ConeGeometry(1.6, .9, 4), L(0x6F7A80)); rf.position.set(9, 1.85, 0); rf.rotation.y = Math.PI / 4; G[7].add(rf);
            [-.6, 0, .6].forEach((x, i) => ball(.55, L(0xF2F5F6), 9 + x, 4.5 + (i == 1 ? .2 : 0), 0, G[7])); box(.06, 1.6, .06, mBl, 9, 3.1, 0, G[7]); G[7].position.x = -.8;
            box(.04, .34, .04, gy, 3.9, .9, .62, G[8]); box(.04, .04, .15, gy, 3.9, 1.07, .69, G[8]); cyl(.04, .24, L(0x44525A), 3.9, .83, .58, G[8], 1); ball(.05, mO, 3.9, .83, .7, G[8]);
            const ZC = {1: [2.85, 1.05, .55], 2: [3.65, .6, .3], 8: [3.9, .85, .6]}, zc = {1: 1, 2: 1, 8: 1}, zt = {1: 1, 2: 1, 8: 1};
            const applyZ = i => {const q = zc[i], c = ZC[i]; G[i].scale.setScalar(q); G[i].position.set((1 - q) * c[0], (1 - q) * c[1], (1 - q) * c[2]);};[1, 2, 8].forEach(applyZ);
            const gE = new THREE.Group(); gE.position.set(1.5, .4, 2.6); G[3].add(gE);
            const eg = new THREE.EdgesGeometry(new THREE.BoxGeometry(1.6, 1.4, 1.2)); const ed = new THREE.LineSegments(eg, new THREE.LineBasicMaterial({color: 0x1B7F79})); ed.position.y = .7; gE.add(ed);
            box(1.6, 1.4, 1.2, L(0x1B7F79, .22), 0, .7, 0, gE); box(.06, .2, .2, L(0xDDE3E6), .83, .7, 0, gE);
            const con = new THREE.Group(); gE.add(con); cyl(.09, .3, L(0x44525A), -.4, 0, 0, con); cyl(.09, .3, L(0x44525A), .4, 0, 0, con);
            const bat = new THREE.Group(); gE.add(bat); cyl(.3, .8, mA, 0, 0, 0, bat);
            const brd = new THREE.Group(); gE.add(brd); box(1.2, .06, .8, L(0x2E8B57), 0, 0, 0, brd); box(.3, .08, .3, L(0x1B2226), -.2, .07, 0, brd); box(.2, .06, .2, L(0x6A5FC9), .25, .06, .1, brd); ball(.07, L(0xE24B4A), .5, .08, -.25, brd); box(.18, .05, .12, L(0xB8C2C7), -.45, .06, .22, brd); box(.2, .06, .14, L(0xE9B44C), 0, .06, -.25, brd);
            const lid = new THREE.Group(); gE.add(lid); box(1.6, .1, 1.2, mN, 0, 0, 0, lid); cyl(.03, .9, L(0x1B7F79), .4, .5, 0, lid); ball(.07, mR, .4, .98, 0, lid);
            const setE = e => {con.position.y = -.15 - .5 * e; bat.position.y = .45 + 1.2 * e; brd.position.y = .95 + 2.4 * e; lid.position.y = 1.45 + 3.6 * e;}; setE(1);
            $('ex').oninput = e => setE(e.target.value / 100);
            const tg = (n, x, y, z) => {const c = document.createElement('canvas'); c.width = c.height = 64; const q = c.getContext('2d'); q.fillStyle = '#1B5E8F'; q.beginPath(); q.arc(32, 32, 28, 0, 6.3); q.fill(); q.fillStyle = '#fff'; q.font = 'bold 34px Arial'; q.textAlign = 'center'; q.textBaseline = 'middle'; q.fillText(n, 32, 34); const s = new THREE.Sprite(new THREE.SpriteMaterial({map: new THREE.CanvasTexture(c), depthTest: false})); s.position.set(x, y, z); s.scale.set(.55, .55, 1); s.renderOrder = 10; sn.add(s); return s;};
            const LD = []; const tl = (p, q) => {const l = new THREE.Line(new THREE.BufferGeometry().setFromPoints([new THREE.Vector3(...p), new THREE.Vector3(...q)]), new THREE.LineBasicMaterial({color: 0x55626A, transparent: true, opacity: .6, depthTest: false})); l.renderOrder = 9; sn.add(l); return l;};
            const TA = [null, [2.6, .5, 3, [2.85, 1.05, .6]], [3.4, .5, 3, [3.7, .6, .3]], [1, .5, 3, [1.5, 1, .5]], [1.8, .5, 3, [1.5, 1.1, .8]], [mid.x, mid.y, mid.z], [-5.4, 5.3, 0], [8.2, 5.6, 0], [4.2, .5, 3, [3.9, .83, .7]]];
            const TG = TA.map((a, i) => {if (!a) return null; if (a[3]) LD[i] = tl(a[3], [a[0], a[1], a[2]]); return tg(i, a[0], a[1], a[2]);});
            const dim = (g, f) => g.traverse(o => {const m = o.material; if (!m) return; if (m.userData.o === undefined) m.userData.o = m.transparent ? m.opacity : 1; m.transparent = true; m.opacity = m.userData.o * f;});
            const cur = {tx: 2, ty: 2, tz: 0, rd: 17, az: .8, el: .35}, goal = Object.assign({}, cur);
            go3 = k => {
                cur.k = k; const a = PS[k]; goal.tx = a[0]; goal.ty = a[1]; goal.tz = a[2]; goal.rd = a[3] * (k === 0 ? Math.max(1, 1.5 / cam.aspect) : 1); goal.az = a[4]; goal.el = a[5];
                for (let i = 0; i <= 9; i++) {dim(G[i], i === 0 && k !== 0 ? .35 : 1); G[i].visible = i === 0 || k === 0 || i === k || (k === 9 && [1, 2, 3, 4, 8].includes(i)) || (i === 9 && k === 3);}
                rw.visible = ![1, 2, 3, 4, 8, 9].includes(k);[1, 2, 8].forEach(i => zt[i] = k === i ? 1.6 : 1); ps.scale.set(k === 6 ? 3.6 : 2.4, k === 6 ? 2.1 : 1.4, 1); ps.position.y = k === 6 ? 5.1 : 4.6;
                gE.visible = k === 3;
                TG.forEach((t, i) => {if (!t) return; t.visible = k === 0; if (LD[i]) LD[i].visible = k === 0; t.scale.set(.55, .55, 1); t.material.opacity = 1;});
            };
            const cv = rn.domElement, pt = new Map(); const zm = f => {goal.rd = Math.min(30, Math.max(2.5, goal.rd * f));};
            cv.onpointerdown = e => {cv.dn = [e.clientX, e.clientY]; pt.set(e.pointerId, [e.clientX, e.clientY]); cv.setPointerCapture(e.pointerId);};
            cv.onpointermove = e => {
                const o = pt.get(e.pointerId); if (!o) return;
                if (pt.size === 2) {const q = [...pt.entries()].find(([i]) => i !== e.pointerId)[1]; const d0 = Math.hypot(o[0] - q[0], o[1] - q[1]); pt.set(e.pointerId, [e.clientX, e.clientY]); const d1 = Math.hypot(e.clientX - q[0], e.clientY - q[1]); if (d0 && d1) zm(d0 / d1);}
                else if (pt.size === 1) {goal.az -= (e.clientX - o[0]) * .01; goal.el = Math.min(1.4, Math.max(.05, goal.el + (e.clientY - o[1]) * .01)); pt.set(e.pointerId, [e.clientX, e.clientY]);}
            };
            cv.onpointerup = cv.onpointercancel = e => {
                pt.delete(e.pointerId);
                if (e.type === 'pointerup' && cv.dn && Math.hypot(e.clientX - cv.dn[0], e.clientY - cv.dn[1]) < 6) {const r = cv.getBoundingClientRect(), m = new THREE.Vector2((e.clientX - r.left) / r.width * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1), rc = new THREE.Raycaster(); rc.setFromCamera(m, cam); const h = rc.intersectObjects(TG.filter(t => t && t.visible)); if (h.length) {const i = TG.indexOf(h[0].object); view(i === cur.k ? 0 : i);} }
                cv.dn = null;
            };
            cv.onwheel = e => {e.preventDefault(); zm(e.deltaY > 0 ? 1.1 : .9);};
            $('zi').onclick = () => zm(.75); $('zo').onclick = () => zm(1.33);
            new ResizeObserver(() => {rn.setSize(W(), H(), false); cam.aspect = W() / H(); cam.updateProjectionMatrix();}).observe($('c3'));
            (function loop() {
                for (const a in goal) cur[a] += (goal[a] - cur[a]) * .1;[1, 2, 8].forEach(i => {if (Math.abs(zt[i] - zc[i]) > .002) {zc[i] += (zt[i] - zc[i]) * .1; applyZ(i);} });
                cam.position.set(cur.tx + cur.rd * Math.cos(cur.el) * Math.sin(cur.az), cur.ty + cur.rd * Math.sin(cur.el) + .1, cur.tz + cur.rd * Math.cos(cur.el) * Math.cos(cur.az));
                cam.lookAt(cur.tx, cur.ty, cur.tz); rn.render(sn, cam); requestAnimationFrame(loop);
            })();
        } catch (e) {$('c3').hidden = true; $('zi').parentNode.hidden = true; $('err').hidden = false;}
        view(0);