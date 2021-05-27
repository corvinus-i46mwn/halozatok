using HajosTeszt.CatModels;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace HajosTeszt.Controllers
{
    [Route("api/cats")]
    [ApiController]
    public class CatController : ControllerBase
    {
        [HttpGet]
        [Route("count")]
        public int M4()
        {
            szamhalContext context = new szamhalContext();
            int macskákSzáma = (from x in context.Macskafajta
                                select x).Count();

            return macskákSzáma;
        }
        // GET: api/<CatController>
        [HttpGet]
        public IEnumerable<Macskafajtum> Get()
        {
            szamhalContext context = new szamhalContext();
            return context.Macskafajta.ToList();
        }

        // GET api/<CatController>/5
        [HttpGet("{id}")]
        public Macskafajtum Get(int id)
        {
            szamhalContext context = new szamhalContext();
            var keresettMacska = (from x in context.Macskafajta
                                where x.Id == id
                                select x).FirstOrDefault();
            return keresettMacska;
        }

        // POST api/<CatController>
        [HttpPost]
        public void Post([FromBody] Macskafajtum újMacska)
        {
            szamhalContext context = new szamhalContext();
            context.Macskafajta.Add(újMacska);
            context.SaveChanges();
        }

        // PUT api/<CatController>/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody] string value)
        {
        }

        // DELETE api/<CatController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            szamhalContext context = new szamhalContext();
            var törlendőMacska = (from x in context.Macskafajta
                                where x.Id == id
                                select x).FirstOrDefault();
            context.Remove(törlendőMacska);
            context.SaveChanges();
        }
        
    }
}
