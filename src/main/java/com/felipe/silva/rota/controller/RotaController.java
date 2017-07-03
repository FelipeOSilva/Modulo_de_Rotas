package com.felipe.silva.rota.controller;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.servlet.ModelAndView;

import com.felipe.silva.rota.model.Coordenada;
import com.felipe.silva.rota.model.Parada;
import com.felipe.silva.rota.model.Rota;
import com.felipe.silva.rota.service.RotaService;

@Controller
public class RotaController {

	@Autowired
	private RotaService rotaService;
	
	@GetMapping(value = {"/rotas", "/"}	)
	public ModelAndView findAll(){
		
		ModelAndView mv = new ModelAndView("/rotas");
		mv.addObject("rotas", rotaService.findAll());

		return mv;
	}
	
	@GetMapping("/add")
	public ModelAndView add(Rota rota){
		
		rota.getStops().add(new Parada());
		//rota.getPath().add(new Coordenada());
        ModelAndView mv = new ModelAndView("/rotaAdd");
		mv.addObject("rota", rota);

		return mv;
	}
	
	public ModelAndView edit(Rota rota){

		ModelAndView mv = new ModelAndView("/rotaEdit");
		mv.addObject("rota", rota);
		
		return mv;
	}
	
	@PostMapping("/save")
	public String save(Rota rota){
		//System.out.println(rota.getRota_id());		
		rotaService.save(rota);
		return "redirect:/rotas";	
	}
	@PostMapping("/saveRota")
	public String saveRota(@Valid Rota rota/*, BindingResult result*/){
/*	
		if(result.hasErrors()){
			return add(rota);
		}
*/
		rotaService.saveRota(rota);

		return "redirect:/rotas";	
	}
	
	@GetMapping("/delete/{rota_id}")
	public String delete(@PathVariable("rota_id") String rota_id){
		rotaService.deleteRota(rota_id);
		
		return "redirect:/rotas";
	}

	@GetMapping("/edit/{rota_id}")
	public ModelAndView edit(@PathVariable("rota_id") String rota_id){
		return edit(rotaService.findById(rota_id));
	}

}
